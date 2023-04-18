'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUserContext } from '../../store/context/UserContext';

function useAuth() {
  const router = useRouter();
  const { user, isLoading } = useUserContext();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoading || isLoggedIn) return;
    router.push('/login');
  }, [isLoggedIn, isLoading, router]);

  return { user };
}

export default useAuth;
