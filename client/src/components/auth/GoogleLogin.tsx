import React from 'react';
import { GoogleIcon } from '../../assets/svg-icons/social-svgs';
import { AppProperty } from '../../constants/app';
import Button from '../ui/buttons/Button';

const GoogleLogin = () => {
    const handleLogin = () => {
        window.open(`${AppProperty.SERVER_DOMAIN}/api/auth/google/login`, '_self');
    };

    return (
        <Button type="button" className="btn-social mt-10" onClick={handleLogin}>
            <div className="flex align-center justify-between">
                <div className="w-[25px]"></div>
                Sign in with Google
                <GoogleIcon height="25" width="25" />
            </div>
        </Button>
    );
};

export default GoogleLogin;
