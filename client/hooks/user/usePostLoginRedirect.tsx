import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { getLoginLink } from '@/utils/links.util';

import useLocalStorage from '../utils/useLocalStorage';

const POST_LOGIN_REDIRECT_ROUTER_KEY = 'post-login-redirect-route';

function usePostLoginRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const [postLoginRedirectRoute, setPostLoginRedirectRoute] = useLocalStorage<string | null>(
    POST_LOGIN_REDIRECT_ROUTER_KEY,
    null,
  );

  const redirectToLoginRoute = useCallback(() => {
    setPostLoginRedirectRoute(pathname);
    router.push(getLoginLink());
  }, [router, pathname, setPostLoginRedirectRoute]);

  const redirectToPostLoginRedirectRoute = useCallback(() => {
    if (postLoginRedirectRoute != null) {
      router.replace(postLoginRedirectRoute);
      setPostLoginRedirectRoute(null);
    } else {
      router.replace('/');
    }
  }, [router, postLoginRedirectRoute, setPostLoginRedirectRoute]);

  return {
    redirectToLoginRoute,
    redirectToPostLoginRedirectRoute,
  };
}

export default usePostLoginRedirect;
