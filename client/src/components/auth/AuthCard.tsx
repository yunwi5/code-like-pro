import React from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { ImKey } from 'react-icons/im';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import AuthInput from '../ui/inputs/AuthInput';
import Button from '../ui/buttons/Button';
import GoogleOAuth from './GoogleOAuth';
import DoLoginOption from './DoLoginOption';

const btnClass = 'min-w-[10rem] my-3 w-full';

type AuthFormState = { email: string; password: string; name?: string };
type AuthErrorState = { email: string; name?: string; password: string; overall: string };

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
        <div className="flex justify-center">
            <div className="absolute z-0 bg-main-400 min-h-[max(65%,30rem)] min-w-[min(26rem,92vw)] md:w-1/3 xl:w-1/4 translate-x-2 translate-y-2" />
            <div className="absolute z-1 flex justify-center px-4 sm:px-6 py-6 min-h-[max(65%,30rem)] min-w-[min(26rem,92vw)] md:w-1/3 xl:w-1/4 bg-grey-300">
                <div className="text-center w-full">
                    <h1 className="logo text-2xl font-light">CodeLikePro</h1>

                    <div>
                        <h2 className="text-xl mt-3">
                            {props.isLogin ? 'Login' : 'Register'}
                        </h2>
                        <p className="text-sm font-light">
                            {props.isLogin
                                ? 'Sign in to your account'
                                : 'Create an account'}
                        </p>
                    </div>

                    <form className="flex flex-col w-full" onSubmit={props.onSubmit}>
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
                        <AuthInput
                            type="password"
                            placeholder="Password"
                            onChange={props.onChange}
                            value={props.formState.password}
                            name="password"
                            error={props.errorState?.password}
                            icon={<ImKey />}
                        />

                        {showDoLogin && (
                            <DoLoginOption doLogin={doLogin} setDoLogin={setDoLogin} />
                        )}

                        {props.errorState?.overall && (
                            <p className="text-rose-500 text-left">
                                {props.errorState.overall}
                            </p>
                        )}

                        <Button type="submit" className={btnClass}>
                            {props.isLoading && <ClipLoader color="#fff" size={30} />}
                            {!props.isLoading && (props.isLogin ? 'Login' : 'Register')}
                        </Button>

                        {props.isLogin ? (
                            <p className="text-sm font-light mr-auto m-0">
                                Don't have an Account?{' '}
                                <Link
                                    to="/register"
                                    className="ml-1 font-semibold text-main-500 link-underline-effect-thin"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        ) : (
                            <p className="text-sm font-light mr-auto m-0">
                                Already have an Account?{' '}
                                <Link
                                    to="/login"
                                    className="ml-1 font-semibold text-main-500 link-underline-effect-thin"
                                >
                                    Log in here
                                </Link>
                            </p>
                        )}

                        <GoogleOAuth />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthCard;
