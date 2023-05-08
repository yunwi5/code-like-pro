import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import usePostLoginRedirect from '@/hooks/user/usePostLoginRedirect';

import { createOrGetGoogleUser } from '../../apis/auth.api';
import { GoogleIcon } from '../../assets/svg-icons/social-svgs';
import { AppProperty } from '../../constants';
import { useUserContext } from '../../store/context/UserContext';
import { toastNotify } from '../../utils/notification.util';
import Button from '../ui/buttons/Button';

const GoogleOAuth = () => {
  const { redirectToPostLoginRedirectRoute } = usePostLoginRedirect();

  const { storeJwtData } = useUserContext();

  const handleLoginSuccess = async (res: CredentialResponse) => {
    const { ok, data, message } = await createOrGetGoogleUser(res);
    if (ok && data) {
      toastNotify(`Welcome to ${AppProperty.APP_NAME}, ${data.user.name}!`, 'success');
      storeJwtData(data.access_token, data.user);
      redirectToPostLoginRedirectRoute();
    } else {
      toastNotify(`Oops, ${message}`, 'error');
    }
  };

  return (
    <div className="relative mt-10">
      <div className="absolute top-0 left-0 w-full h-[50px] opacity-0">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => toastNotify('Google OAuth went wrong...', 'error')}
          width="100%"
          useOneTap
        />
      </div>

      <Button type="button" className="btn-social w-full">
        <div className="flex align-center justify-between">
          <div className="w-[25px]"></div>
          Continue with Google
          <GoogleIcon height="25" width="25" />
        </div>
      </Button>
    </div>
  );
};

export default GoogleOAuth;
