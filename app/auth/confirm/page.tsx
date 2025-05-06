'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ConfirmPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleLogin = async () => {
      console.log('[ConfirmPage] Attempting exchangeCodeForSession...');
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (exchangeError) {
        console.error('[ConfirmPage] Exchange error:', exchangeError);
        return;
      }

      const sessionResponse = await supabase.auth.getSession();
      const session = sessionResponse.data?.session;
      const sessionError = sessionResponse.error;

      if (sessionError) {
        console.error('[ConfirmPage] getSession error:', sessionError);
        return;
      }

      if (session) {
        console.log('[ConfirmPage] Login successful, redirecting...');
        router.push('/dashboard');
      } else {
        console.warn('[ConfirmPage] No session found after exchange.');
      }
    };

    handleLogin();
  }, [router, supabase]);

  return <p>Confirming your login...</p>;
}
