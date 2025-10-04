// Test Supabase Connection
// Run this in browser console to test your Supabase setup

import { supabase } from '@/lib/supabase';

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test 1: Check if we can connect to Supabase
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Test 2: Check table schema
    const { data: schemaData, error: schemaError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (schemaError) {
      console.error('❌ Schema test failed:', schemaError);
      return false;
    }
    
    console.log('✅ Table schema accessible');
    console.log('Sample row structure:', schemaData?.[0] || 'No data yet');
    
    // Test 3: Try a simple insert with minimal data
    const testEmail = `test-${Date.now()}@company.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([{
        email: testEmail,
        role: 'employee',
        password: 'test123',
        company_id: 'company-1',
        manager_id: null
      }])
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError);
      console.error('Error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      return false;
    }
    
    console.log('✅ Insert test successful:', insertData);
    
    // Clean up test data
    await supabase.from('users').delete().eq('email', testEmail);
    console.log('✅ Test data cleaned up');
    
    return true;
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

// Export for console testing
window.testSupabaseConnection = testSupabaseConnection;

console.log('Test function loaded. Run: testSupabaseConnection()');