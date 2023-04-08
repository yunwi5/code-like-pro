import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUserContext } from '../../store/context/UserContext';

function useAuth() {
  const router = useRouter();
  const { user, isLoading } = useUserContext();
  const isLoggedIn = !!user;

  // // If the user is not logged in, redirect to the login page.
  useEffect(() => {
    if (isLoading || isLoggedIn) return;
    router.push('/login');
  }, [isLoggedIn, isLoading, router]);

  return { user };
}

export default useAuth;
