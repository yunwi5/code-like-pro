import React from 'react';
import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';
import LoginForm from '../../components/auth/LoginForm';

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
            <main className="flex justify-center lg:gap-8 xl:gap-[7.5%] mb-6 min-h-[max(80vh,35rem)] px-3 md:px-5 xl:px-10 py-16 text-gray-700">
                <LoginForm />
            </main>
        </>
    );
};

export default LoginPage;
