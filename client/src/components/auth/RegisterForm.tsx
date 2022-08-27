import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerRequest } from '../../apis/auth';
import { ToastType } from '../../models/enums';
import { toastNotify } from '../../utils/notification/toast';
import {
    invalidateEmail,
    invalidatePassword,
    invalidateUsername,
} from '../../utils/string-utils/validation';
import AuthCard from './AuthCard';

type RegisterState = { email: string; name: string; password: string };
const RegisterForm = () => {
    const navigate = useNavigate();
    const [registerState, setRegisterState] = useState({ email: '', password: '', name: '' });
    const [errorState, setErrorState] = useState({ email: '', password: '', name: '' });

    // Check if the form is initially submitted by the user.
    const initialSubmitRef = useRef<boolean>(false);

    // Handle form validation
    const doValidation = (state: RegisterState, key: string) => {
        if (key === 'email' || key === 'all')
            errorState.email = invalidateEmail(state.email) || '';
        if (key === 'name' || key === 'all')
            errorState.name = invalidateUsername(state.name) || '';
        if (key === 'password' || key === 'all')
            errorState.password = invalidatePassword(state.password) || '';
        setErrorState({ ...errorState });
        return errorState;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterState((prev) => {
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
        const error = doValidation(registerState, 'all');

        // If any errorState is on, do not send the register request.
        if (Object.values(error).join('').trim()) return;
        const { ok, data, message } = await registerRequest(registerState);

        // If register is success, redirect to the login page.
        if (ok) {
            navigate('/login');
            toastNotify('Register successful!', ToastType.SUCCESS);
        }
    };

    return (
        <AuthCard
            isLogin={false}
            formState={registerState}
            errorState={errorState}
            onSubmit={handleSubmit}
            onChange={handleChange}
        />
    );
};

export default RegisterForm;
