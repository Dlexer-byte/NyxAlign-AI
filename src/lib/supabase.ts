import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfmcwpojxrxcaglbxybe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmbWN3cG9qeHJ4Y2FnbGJ4eWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTQ3NzcsImV4cCI6MjA1NzAzMDc3N30.FPHghfdm4kjPR6f8kLHN0fZ0LjBl1kQScpwjQFoVrag';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export async function signInWithGoogle(redirectTo = '/dashboard') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      redirectTo: `https://bolt-diy-6-1741454480178.netlify.app${redirectTo}`,
    },
  });
  if (error) {
    console.error('Sign-in error:', error.message);
    return { error };
  }
  console.log('Sign-in initiated:', data);
  return { data };
}
