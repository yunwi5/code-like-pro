import React from 'react';
import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Login | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Login page of ${AppProperty.APP_NAME} where users can log into their accounts.`}
                />
            </Helmet>
            <div>LoginPage</div>
        </>
    );
};

export default LoginPage;
