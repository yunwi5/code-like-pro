import React from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import AuthInput from '../ui/inputs/AuthInput';
import Button from '../ui/buttons/Button';
import GoogleOAuth from './GoogleOAuth';
import DoLoginOption from './DoLoginOption';
import PasswordInput from '../ui/inputs/PasswordInput';

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

type Props = {
    isLogin: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formState: AuthFormState; // form state that stores current value for each input
    errorState?: AuthErrorState; // form state that stores error for each input
    isLoading?: boolean;
    doLogin?: boolean;
    setDoLogin?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthCard = (props: Props) => {
    const { doLogin, setDoLogin } = props;

    const showDoLogin = doLogin != null && setDoLogin;

    return (
        <div className="absolute z-1 flex justify-center px-2 sm:px-6 pt-6 pb-12 min-h-[max(65%,30rem)] min-w-[min(28rem,92vw)] md:w-1/3 xl:w-1/4 bg-grey-300 after:hidden sm:after:block after:absolute after:top-[0.55rem] after:left-2 after:z-[-1] after:w-full after:h-full after:bg-main-400 after:shadow-lg">
            <div className="text-center w-full">
                <h1 className="logo text-2xl font-light">CodeLikePro</h1>

                <div>
                    <h2 className="text-xl mt-3">
                        {props.isLogin ? 'Login' : 'Register'}
                    </h2>
                    <p className="text-sm font-light">
                        {props.isLogin ? 'Sign in to your account' : 'Create an account'}
                    </p>
                </div>

                <form className="flex flex-col w-full mt-3" onSubmit={props.onSubmit}>
                    <div
                        className={`flex flex-col ${
                            props.isLogin ? 'gap-6' : 'gap-4'
                        } mb-3`}
                    >
                        {!props.isLogin && (
                            <AuthInput
                                type="text"
                                placeholder="Username"
                                onChange={props.onChange}
                                value={props.formState.name}
                                error={props.errorState?.name}
                                name="name"
                                icon={<FaUserAlt />}
                            />
                        )}
                        <AuthInput
                            type="email"
                            placeholder="Email"
                            onChange={props.onChange}
                            value={props.formState.email}
                            name="email"
                            icon={<MdEmail />}
                            error={props.errorState?.email}
                        />

                        <PasswordInput
                            placeholder="Password"
                            onChange={props.onChange}
                            value={props.formState.password}
                            name="password"
                            error={props.errorState?.password}
                        />

                        {!props.isLogin && (
                            <PasswordInput
                                placeholder="Password Confirm"
                                onChange={props.onChange}
                                value={props.formState.passwordConfirm}
                                name="passwordConfirm"
                                error={props.errorState?.passwordConfirm}
                            />
                        )}
                    </div>

                    {showDoLogin && (
                        <DoLoginOption doLogin={doLogin} setDoLogin={setDoLogin} />
                    )}

                    {props.errorState?.overall && (
                        <p className="text-rose-500 text-left">
                            {props.errorState.overall}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className={'min-w-[10rem] my-3 py-[0.7rem] w-full'}
                    >
                        {props.isLoading && <ClipLoader color="#fff" size={30} />}
                        {!props.isLoading && (props.isLogin ? 'Login' : 'Register')}
                    </Button>

                    <p className="m-0 mr-auto text-sm text-gray-500">
                        {props.isLogin
                            ? "Don't have an Account? "
                            : 'Already have an Account? '}
                        <Link
                            to={props.isLogin ? '/register' : '/login'}
                            className="ml-1 font-semibold text-main-500 link-underline-effect-thin"
                        >
                            {props.isLogin ? 'Sign up here' : 'Log in here'}
                        </Link>
                    </p>

                    <GoogleOAuth />
                </form>
            </div>
        </div>
    );
};

export default AuthCard;
