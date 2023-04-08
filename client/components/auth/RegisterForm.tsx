import React, { useRef, useState } from 'react';

import { useUserContext } from '../../store/context/UserContext';
import { registerRequest } from '../../apis/auth.api';
import { toastNotify } from '../../utils/notification.util';
import {
  invalidateEmail,
  invalidatePassword,
  invalidatePasswordConfirm,
  invalidateUsername,
} from '../../utils/string-utils/validation.util';
import AuthCard from './AuthCard';
import { useRouter } from 'next/navigation';

type IRegisterState = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const { storeJwtData } = useUserContext();
  const [registerState, setRegisterState] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });
  const [errorState, setErrorState] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    overall: '',
  });
  const [doLogin, setDoLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Check if the form is initially submitted by the user.
  const initialSubmitRef = useRef<boolean>(false);

  // Handle form validation
  const doValidation = (state: IRegisterState, key: string) => {
    if (key === 'email' || key === 'all') errorState.email = invalidateEmail(state.email);
    if (key === 'name' || key === 'all') errorState.name = invalidateUsername(state.name);
    if (key === 'password' || key === 'all')
      errorState.password = invalidatePassword(state.password);
    if (key === 'passwordConfirm' || key === 'all')
      errorState.passwordConfirm = invalidatePasswordConfirm(
        state.password,
        state.passwordConfirm,
      );

    setErrorState({ ...errorState, overall: '' });
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

    setIsLoading(true);
    const { ok, data, message } = await registerRequest(registerState);
    setIsLoading(false);

    // If register is success, redirect to the login page.
    if (ok && data) {
      toastNotify('Register successful!', 'success');

      if (doLogin) {
        storeJwtData(data.access_token, data.user);
        router.replace('/');
      } else {
        router.push('/login');
      }
    } else {
      setErrorState({
        ...errorState,
        overall: message || 'Something went wrong...',
      });
    }
  };

  return (
    <AuthCard
      isLogin={false}
      formState={registerState}
      errorState={errorState}
      onSubmit={handleSubmit}
      onChange={handleChange}
      isLoading={isLoading}
      doLogin={doLogin}
      setDoLogin={setDoLogin}
    />
  );
};

export default RegisterForm;
