import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { createOrGetGoogleUser } from '../../apis/auth.api';
import { useUserContext } from '../../store/context/UserContext';
import { toastNotify } from '../../utils/notification';
import { AppProperty } from '../../constants/app';

const GoogleOAuth = () => {
    const navigate = useNavigate();

    const { storeJwtData } = useUserContext();
    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => {
    //         console.log(tokenResponse);
    //     },
    //     onError: () => console.log('Google Oauth error!'),
    //     flow: 'auth-code',
    // });

    const handleLoginSuccess = async (res: CredentialResponse) => {
        const { ok, data } = await createOrGetGoogleUser(res);
        if (ok && data) {
            toastNotify(
                `Welcome to ${AppProperty.APP_NAME}, ${data.user.name}!`,
                'success',
            );
            storeJwtData(data.access_token, data.user);
            navigate('/');
        } else {
            toastNotify(
                'Something went wrong while login to your Google account..',
                'error',
            );
        }
    };

    return (
        <>
            <GoogleLogin onSuccess={handleLoginSuccess} />
            {/* <Button type="button" onClick={() => login()} className="btn-social mt-10">
                <div className="flex align-center justify-between">
                    <div className="w-[25px]"></div>
                    Sign in with Google
                    <GoogleIcon height="25" width="25" />
                </div>
            </Button> */}
        </>
    );
};

export default GoogleOAuth;
