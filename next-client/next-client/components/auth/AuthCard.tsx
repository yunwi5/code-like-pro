import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';

import Button from '../ui/buttons/Button';
import AuthInput from '../ui/inputs/AuthInput';
import PasswordInput from '../ui/inputs/PasswordInput';

import DoLoginOption from './DoLoginOption';
import GoogleOAuth from './GoogleOAuth';

type AuthFormState = {
  email: string;
  password: string;
  name?: string;
  passwordConfirm?: string;
};

type AuthErrorState = {
  email: string;
  name?: string;
  password: string;
  passwordConfirm?: string;
  overall: string;
};

type AuthCardProps = {
  isLogin: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formState: AuthFormState; // form state that stores current value for each input
  errorState?: AuthErrorState; // form state that stores error for each input
  isLoading?: boolean;
  doLogin?: boolean;
  setDoLogin?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthCard = (props: AuthCardProps) => {
  const { isLogin, onSubmit, onChange, formState, errorState, isLoading, doLogin, setDoLogin } =
    props;

  const showDoLogin = doLogin != null && setDoLogin;

  return (
    <div className="absolute flex justify-center px-2 sm:px-6 pt-6 pb-12 min-w-[min(28rem,92vw)] xl:w-1/4 bg-grey-300 after:hidden sm:after:block after:absolute after:top-[0.55rem] after:left-2 after:z-[-1] after:w-full after:h-full after:bg-main-400 after:shadow-[7px_8px_1px_rgba(0,0,0,0.3)]">
      <div className="text-center w-full">
        <h1 className="logo text-2xl font-light">CodeLikePro</h1>

        <div>
          <h2 className="text-xl mt-3">{isLogin ? 'Login' : 'Register'}</h2>
          <p className="text-sm font-light">
            {isLogin ? 'Sign in to your account' : 'Create an account'}
          </p>
        </div>

        <form className="flex flex-col w-full mt-3" onSubmit={onSubmit}>
          <div className={`flex flex-col ${isLogin ? 'gap-6' : 'gap-4'} mb-3`}>
            {!isLogin && (
              <AuthInput
                type="text"
                placeholder="Username"
                onChange={onChange}
                value={formState.name}
                error={errorState?.name}
                name="name"
                icon={<FaUserAlt />}
              />
            )}
            <AuthInput
              type="email"
              placeholder="Email"
              onChange={onChange}
              value={formState.email}
              name="email"
              icon={<MdEmail />}
              error={errorState?.email}
            />

            <PasswordInput
              placeholder="Password"
              onChange={onChange}
              value={formState.password}
              name="password"
              error={errorState?.password}
            />

            {!isLogin && (
              <PasswordInput
                placeholder="Password Confirm"
                onChange={onChange}
                value={formState.passwordConfirm}
                name="passwordConfirm"
                error={errorState?.passwordConfirm}
              />
            )}
          </div>

          {showDoLogin && <DoLoginOption doLogin={doLogin} setDoLogin={setDoLogin} />}

          {errorState?.overall && <p className="text-rose-500 text-left">{errorState.overall}</p>}

          <Button type="submit" className={'min-w-[10rem] my-3 py-[0.7rem] w-full'}>
            {isLoading && <ClipLoader color="#fff" size={30} />}
            {!isLoading && (isLogin ? 'Login' : 'Register')}
          </Button>

          <p className="m-0 mr-auto text-sm text-gray-500">
            {isLogin ? "Don't have an Account? " : 'Already have an Account? '}
            <Link
              href={isLogin ? '/register' : '/login'}
              className="ml-1 font-semibold text-main-500 link-underline-effect-thin"
            >
              {isLogin ? 'Sign up here' : 'Log in here'}
            </Link>
          </p>

          <GoogleOAuth />
        </form>
      </div>
    </div>
  );
};

export default AuthCard;
