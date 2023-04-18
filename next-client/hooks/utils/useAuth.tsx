'use client';
import { useEffect } from 'react';

import { useUserContext } from '../../store/context/UserContext';
import usePostLoginRedirect from '../user/usePostLoginRedirect';

function useAuth() {
  const { redirectToLoginRoute } = usePostLoginRedirect();
  const { user, isLoading } = useUserContext();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoading || isLoggedIn) return;
    redirectToLoginRoute();
  }, [isLoggedIn, isLoading, redirectToLoginRoute]);
}

export default useAuth;
