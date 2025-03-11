import React, { useEffect } from 'react';
import supabase from '../lib/supabase'; // Default import

const AuthCallback: React.FC = () => {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        window.location.href = '/dashboard';
      }
    });
  }, []);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
