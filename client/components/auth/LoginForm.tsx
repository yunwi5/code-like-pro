'use client';
import React, { useRef, useState } from 'react';

import usePostLoginRedirect from '@/hooks/user/usePostLoginRedirect';

import { useUserContext } from '../../store/context/UserContext';
import { toastNotify } from '../../utils/notification.util';
import { invalidateEmail, invalidatePassword } from '../../utils/string-utils/validation.util';

import AuthCard from './AuthCard';

type LoginState = { email: string; password: string };
const LoginForm = () => {
  const { redirectToPostLoginRedirectRoute } = usePostLoginRedirect();
  const { login, isLoading } = useUserContext();
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [errorState, setErrorState] = useState({ email: '', password: '', overall: '' });

  // Check if the form is initially submitted by the user.
  const initialSubmitRef = useRef<boolean>(false);

  // Handle form validation
  const doValidation = (state: LoginState, key: string) => {
    if (key === 'email' || key === 'all') errorState.email = invalidateEmail(state.email) || '';
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

    if (Object.values(error).join('').trim()) return;
    const { ok, message, data } = await login(loginState);

    if (ok && data) {
      redirectToPostLoginRedirectRoute();
      toastNotify('Login Successful!', 'success');
    } else {
      setErrorState((prev) => ({
        ...prev,
        overall: message ?? 'Your email or password are incorrect',
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
    />
  );
};

export default LoginForm;
