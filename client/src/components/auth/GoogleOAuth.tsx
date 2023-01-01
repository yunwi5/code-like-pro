import Button from '../ui/buttons/Button';
import { GoogleIcon } from '../../assets/svg-icons/social-svgs';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { createOrGetGoogleUser } from '../../apis/auth.api';

const GoogleOAuth = () => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
        },
        onError: () => console.log('Google Oauth error!'),
        flow: 'auth-code',
    });

    return (
        <>
            <GoogleLogin
                onSuccess={async (res) => {
                    const { data } = await createOrGetGoogleUser(res);
                    console.log('google auth:', data);
                }}
            />
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
