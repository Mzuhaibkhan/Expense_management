import { supabase } from '../lib/supabase';

export const debugDatabase = {
  async getAllUsers() {
    try {
      console.log('=== DEBUG: Fetching all users from database ===');
      
      const { data, error } = await supabase
        .from('Users')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error);
        return { error, data: null };
      }

      console.log('All users in database:', data);
      console.log('Total users found:', data?.length || 0);
      
      if (data && data.length > 0) {
        console.log('Sample user structure:', data[0]);
        console.log('All emails in database:', data.map(u => u.email));
      }

      return { data, error: null };
    } catch (err) {
      console.error('Exception while fetching users:', err);
      return { error: err, data: null };
    }
  },

  async findUserByEmail(email: string) {
    try {
      console.log(`=== DEBUG: Looking for user with email: ${email} ===`);
      
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', email);

      console.log('Query result:', { data, error });
      
      if (data && data.length > 0) {
        console.log('Found user(s):', data);
      } else {
        console.log('No user found with email:', email);
      }

      return { data, error };
    } catch (err) {
      console.error('Exception while finding user:', err);
      return { error: err, data: null };
    }
  },

  async testDatabaseConnection() {
    try {
      console.log('=== DEBUG: Testing database connection ===');
      
      const { data, error } = await supabase
        .from('Users')
        .select('count', { count: 'exact' });

      console.log('Connection test result:', { data, error });
      return { success: !error, error };
    } catch (err) {
      console.error('Database connection test failed:', err);
      return { success: false, error: err };
    }
  }
};

// Make it available globally for console debugging
(window as any).debugDatabase = debugDatabase;