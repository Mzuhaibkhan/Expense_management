import { supabase } from '@/lib/supabase';
import type { User } from '@/types';

/**
 * Supabase Users Service
 * Handles all database operations for Users table
 * Schema: manager_id (PK, NOT NULL), id, email, role, password, company_id, created_at
 */

// Type for Supabase database row (matches your actual schema)
interface SupabaseUser {
  manager_id: string; // Primary key, NOT NULL
  id: string; // User's name/identifier
  email: string;
  role: string | null;
  password: string | null;
  company_id: string | null;
  created_at: string | null;
  manager_name: string | null; // Name of their manager
}

// Helper function to convert Supabase row to app User type
function mapSupabaseToUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id || supabaseUser.manager_id, // Use id if available, fallback to manager_id
    name: supabaseUser.id || 'Unknown User', // Use id field as name since we store name there
    email: supabaseUser.email || '',
    role: (supabaseUser.role as User['role']) || 'employee',
    managerId: supabaseUser.manager_name || undefined, // Use manager_name for the manager relationship
    companyId: supabaseUser.company_id || '',
    databaseId: supabaseUser.manager_id, // Store the database primary key
  };
}

// Helper function to generate unique manager_id
function generateManagerId(): string {
  return `mgr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const usersService = {
  /**
   * Fetch all users from Supabase
   */
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .order('email', { ascending: true });

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return (data || []).map(mapSupabaseToUser);
  },

  /**
   * Fetch users by company ID
   */
  async getByCompany(companyId: string): Promise<User[]> {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('company_id', companyId)
      .order('email', { ascending: true });

    if (error) {
      console.error('Error fetching users by company:', error);
      throw error;
    }

    return (data || []).map(mapSupabaseToUser);
  },

  /**
   * Add a new user to Supabase
   */
  async create(user: Omit<User, 'id'> & { password: string }): Promise<User> {
    // Normalize email to prevent issues
    const normalizedEmail = user.email.trim().toLowerCase();
    
    console.log('Creating user with data:', {
      name: user.name,
      email: normalizedEmail,
      originalEmail: user.email,
      role: user.role,
      company_id: user.companyId,
      manager_name: user.managerId, // This is actually the manager's name
      hasPassword: !!user.password
    });

    // Generate a unique manager_id for this new user (their primary key)
    const newUserManagerId = generateManagerId();
    
    // Create the exact object that matches your table schema
    const insertData = {
      manager_id: newUserManagerId, // This user's primary key
      id: user.name, // Use name field as id
      email: normalizedEmail, // Use normalized email
      role: user.role,
      password: user.password.trim(), // Trim password too
      company_id: user.companyId,
      manager_name: user.managerId || null, // Store the selected manager's name
      created_at: new Date().toISOString()
    };

    console.log('Exact insert data:', insertData);

    const { data, error } = await supabase
      .from('Users')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Failed to create user: ${error.message}`);
    }

    console.log('User created successfully:', data);
    return mapSupabaseToUser(data);
  },

  /**
   * Update an existing user in Supabase
   */
  async update(user: User, password?: string): Promise<User> {
    console.log('Updating user with data:', {
      name: user.name,
      email: user.email,
      role: user.role,
      company_id: user.companyId,
      manager_name: user.managerId, // This is actually the manager's name
      hasPassword: !!password
    });

    const updateData: Partial<Omit<SupabaseUser, 'created_at' | 'manager_id'>> = {
      id: user.name, // Use name as id
      email: user.email,
      role: user.role,
      company_id: user.companyId,
      manager_name: user.managerId || null, // Store the selected manager's name
    };

    // Only update password if provided
    if (password) {
      updateData.password = password;
    }

    console.log('Exact update data:', updateData);
    console.log('Updating user with manager_id:', user.managerId || user.id);

    const { data, error } = await supabase
      .from('Users')
      .update(updateData)
      .eq('manager_id', user.databaseId) // Use the database primary key for update
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      console.error('Update error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Failed to update user: ${error.message}`);
    }

    console.log('User updated successfully:', data);
    return mapSupabaseToUser(data);
  },

  /**
   * Delete a user from Supabase
   */
  async delete(userManagerId: string): Promise<void> {
    const { error } = await supabase
      .from('Users')
      .delete()
      .eq('manager_id', userManagerId); // Use manager_id as PK for delete

    if (error) {
      console.error('Error deleting user:', error);
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },

  /**
   * Get a single user by manager_id (PK)
   */
  async getByManagerId(managerId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('manager_id', managerId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching user by manager ID:', error);
      return null;
    }

    return mapSupabaseToUser(data);
  },

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching user by email:', error);
      return null;
    }

    return mapSupabaseToUser(data);
  },

  /**
   * Check if email already exists
   */
  async emailExists(email: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('Users')
      .select('email')
      .eq('email', email)
      .single();

    if (error) {
      return false; // Email doesn't exist
    }

    return !!data;
  },
};
