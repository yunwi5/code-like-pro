import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../store/context/UserContext';
import { toastNotify } from '../../utils/notification';
import { invalidateEmail, invalidatePassword } from '../../utils/string-utils/validation';
import AuthCard from './AuthCard';

type LoginState = { email: string; password: string };
const LoginForm = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useUserContext();
    const [loginState, setLoginState] = useState({ email: '', password: '' });
    const [errorState, setErrorState] = useState({ email: '', password: '', overall: '' });

    // Check if the form is initially submitted by the user.
    const initialSubmitRef = useRef<boolean>(false);

    // Handle form validation
    const doValidation = (state: LoginState, key: string) => {
        if (key === 'email' || key === 'all')
            errorState.email = invalidateEmail(state.email) || '';
        if (key === 'password' || key === 'all')
            errorState.password = invalidatePassword(state.password) || '';
        setErrorState({ ...errorState, overall: '' });
        return errorState;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState((prev) => {
            const newState = {
                ...prev,
                [e.target.name]: e.target.value,
            };
            // If the form was initially submitted, do validation.
            if (initialSubmitRef.current) doValidation(newState, e.target.name);
            return newState;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        initialSubmitRef.current = true;
        const error = doValidation(loginState, 'all');

        // If any errorState is on, do not send the register request.
        if (Object.values(error).join('').trim()) return;
        const { ok, message, data } = await login(loginState);

        // If the login is success, redirect to the home page.
        if (ok && data) {
            navigate('/');
            toastNotify('Login Successful!', 'success');
        } else {
            setErrorState((prev) => ({
                ...prev,
                overall: message || 'Something went wrong...',
            }));
        }
    };

    return (
        <AuthCard
            isLogin={true}
            onSubmit={handleSubmit}
            onChange={handleChange}
            formState={loginState}
            errorState={errorState}
            isLoading={isLoading}
        ></AuthCard>
    );
};

export default LoginForm;
