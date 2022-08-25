import React from 'react';
import Header from '../../components/layout/Header';
import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>Register | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Registration page of ${AppProperty.APP_NAME} where users can create a new account.`}
                />
            </Helmet>
            <div>RegisterPage</div>
        </>
    );
};

export default RegisterPage;
