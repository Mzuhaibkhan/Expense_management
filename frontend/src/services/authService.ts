import { supabase } from '@/lib/supabase';
import type { User } from '@/types';

/**
 * Authentication Service using Supabase Users table
 * Handles login/logout and user verification
 */

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: User['role'];
  companyId?: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Helper function to validate user data from database
function validateUserData(userData: any): boolean {
  const requiredFields = ['email', 'role', 'manager_id'];
  const validRoles = ['admin', 'manager', 'sub-manager', 'employee'];
  
  // Check required fields
  for (const field of requiredFields) {
    if (!userData[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }
  
  // Check valid role
  if (!validRoles.includes(userData.role)) {
    console.error(`Invalid role: ${userData.role}`);
    return false;
  }
  
  return true;
}

export const authService = {
  /**
   * Authenticate user against Users table
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Normalize the email input (trim and lowercase)
      const normalizedEmail = credentials.email.trim().toLowerCase();
      const normalizedPassword = credentials.password.trim();
      
      console.log('Attempting login for:', normalizedEmail);
      console.log('Original email input:', `"${credentials.email}"`);
      console.log('Normalized email:', `"${normalizedEmail}"`);
      console.log('Password provided:', normalizedPassword ? 'YES' : 'NO');
      
      // First, get all users to see what we're working with
      const { data: allUsers, error: allUsersError } = await supabase
        .from('Users')
        .select('email, password, role, id, manager_id, manager_name, company_id');

      if (allUsersError) {
        console.error('Error fetching all users:', allUsersError);
        return {
          success: false,
          error: 'Database connection error'
        };
      }

      console.log('All users in database:');
      if (allUsers) {
        allUsers.forEach((user, index) => {
          console.log(`User ${index + 1}:`, {
            email: `"${user.email}"`,
            emailLength: user.email?.length,
            hasPassword: !!user.password,
            role: user.role,
            id: user.id
          });
        });
      }

      // Try to find user by exact email match first
      let userCheck = allUsers?.find(user => user.email === normalizedEmail);
      
      if (!userCheck) {
        // Try original email (case sensitive)
        userCheck = allUsers?.find(user => user.email === credentials.email);
      }
      
      if (!userCheck) {
        // Try case-insensitive search
        userCheck = allUsers?.find(user => user.email?.toLowerCase() === normalizedEmail);
      }

      console.log('User found:', userCheck);

      if (!userCheck) {
        console.log('No user found with email:', normalizedEmail);
        console.log('Available emails:', allUsers?.map(u => `"${u.email}"`));
        return {
          success: false,
          error: 'No account found with this email address'
        };
      }

      // Check password
      if (!userCheck.password) {
        console.log('User found but no password set in database');
        return {
          success: false,
          error: 'Account setup incomplete. Contact administrator.'
        };
      }

      console.log('Password comparison:');
      console.log('Stored password:', `"${userCheck.password}"`);
      console.log('Provided password:', `"${normalizedPassword}"`);
      console.log('Passwords match:', userCheck.password === normalizedPassword);
      
      // Try both normalized and original password
      const passwordMatch = userCheck.password === normalizedPassword || 
                           userCheck.password === credentials.password;

      if (!passwordMatch) {
        console.log('Password mismatch');
        return {
          success: false,
          error: 'Invalid password'
        };
      }

      console.log('Login successful, raw user data:', userCheck);

      // Validate user data integrity
      if (!validateUserData(userCheck)) {
        console.error('Invalid user data structure:', userCheck);
        return {
          success: false,
          error: 'Invalid user data. Please contact administrator.'
        };
      }

      // Map database user to application User type
      const user: User = {
        id: userCheck.id || userCheck.manager_id,
        name: userCheck.id || 'Unknown User',
        email: userCheck.email,
        role: userCheck.role as User['role'],
        managerId: userCheck.manager_name || undefined,
        companyId: userCheck.company_id || '',
        databaseId: userCheck.manager_id,
      };

      console.log('Mapped user object:', user);
      console.log('User will be redirected to:', this.getRedirectUrl(user.role));

      return {
        success: true,
        user
      };

    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: 'An unexpected error occurred during login'
      };
    }
  },

  /**
   * Register a new user in the Users table
   */
  async signup(signupData: SignupData): Promise<AuthResponse> {
    try {
      // Normalize email
      const normalizedEmail = signupData.email.trim().toLowerCase();
      
      console.log('Attempting signup for:', normalizedEmail);
      console.log('Signup data structure:', {
        name: signupData.name,
        email: normalizedEmail,
        originalEmail: signupData.email,
        role: signupData.role,
        companyId: signupData.companyId,
        hasPassword: !!signupData.password
      });

      // First check if email already exists
      const { data: existingUser } = await supabase
        .from('Users')
        .select('email')
        .eq('email', normalizedEmail)
        .single();

      if (existingUser) {
        console.log('Email already exists:', normalizedEmail);
        return {
          success: false,
          error: 'An account with this email already exists'
        };
      }

      // Generate unique manager_id for new user
      const managerId = `mgr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create user record
      const insertData = {
        manager_id: managerId,
        id: signupData.name,
        email: normalizedEmail, // Use normalized email
        role: signupData.role,
        password: signupData.password.trim(), // Trim password
        company_id: signupData.companyId || 'default-company',
        manager_name: null, // New users don't have a manager by default
        created_at: new Date().toISOString()
      };

      console.log('Signup insert data:', insertData);

      const { data, error } = await supabase
        .from('Users')
        .insert([insertData])
        .select()
        .single();

      console.log('Signup insert result:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        return {
          success: false,
          error: 'Failed to create account. Please try again.'
        };
      }

      console.log('Signup successful, raw data:', data);

      // Map the created user to our User type
      const user: User = {
        id: data.id || data.manager_id,
        name: data.id || 'Unknown User',
        email: data.email,
        role: data.role as User['role'],
        managerId: data.manager_name || undefined,
        companyId: data.company_id || '',
        databaseId: data.manager_id,
      };

      console.log('Mapped signup user:', user);

      return {
        success: true,
        user
      };

    } catch (err) {
      console.error('Signup error:', err);
      return {
        success: false,
        error: 'An unexpected error occurred during signup'
      };
    }
  },

  /**
   * Get user by email (for session restoration)
   */
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id || data.manager_id,
        name: data.id || 'Unknown User',
        email: data.email,
        role: data.role as User['role'],
        managerId: data.manager_name || undefined,
        companyId: data.company_id || '',
        databaseId: data.manager_id,
      };

    } catch (err) {
      console.error('Error fetching user by email:', err);
      return null;
    }
  },

  /**
   * Logout (clear local session)
   */
  async logout(): Promise<void> {
    // Clear any stored session data
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  },

  /**
   * Get redirect URL based on user role
   */
  getRedirectUrl(role: User['role']): string {
    console.log('Getting redirect URL for role:', role);
    
    switch (role) {
      case 'admin':
        console.log('Redirecting admin to /admin');
        return '/admin';
      case 'manager':
        console.log('Redirecting manager to /manager');
        return '/manager';
      case 'sub-manager':
        console.log('Redirecting sub-manager to /sub-manager');
        return '/sub-manager';
      case 'employee':
        console.log('Redirecting employee to /employee');
        return '/employee';
      default:
        console.warn('Unknown role:', role, 'defaulting to /employee');
        return '/employee'; // Default fallback
    }
  }
};