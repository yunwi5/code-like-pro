import React from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { ImKey } from 'react-icons/im';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import CustomInput from '../ui/inputs/CustomInput';
import Button from '../ui/buttons/Button';
import { GoogleIcon } from '../../assets/svg-icons/social-svgs';
import { IAuthErrorState, IAuthFormState } from '../../models/interfaces';
import GoogleLogin from './GoogleLogin';

const btnClass = 'min-w-[10rem] my-3 w-full';

const AuthCard = (props: {
    isLogin: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formState: IAuthFormState; // form state that stores current value for each input
    errorState?: IAuthErrorState; // form state that stores error for each input
    isLoading?: boolean;
}) => {
    return (
        <div className="flex justify-center">
            <div className="absolute z-0 bg-main-400 h-[65%] md:w-1/4 translate-x-2 translate-y-2"></div>
            <div className="absolute z-1 flex justify-center p-6 h-[65%] bg-grey-300 md:w-1/4 ">
                <div className="text-center w-full">
                    <h1 className="logo text-2xl font-light">CodeLikePro</h1>

                    <div>
                        <h2 className="text-lg mt-3">
                            {props.isLogin ? 'Login' : 'Register'}
                        </h2>
                        <p className="text-xs font-light">
                            {props.isLogin ? 'Sign in to your account' : 'Create an account'}
                        </p>
                    </div>

                    <form className="flex flex-col w-full" onSubmit={props.onSubmit}>
                        {!props.isLogin && (
                            <CustomInput
                                type="text"
                                placeholder="Username"
                                onChange={props.onChange}
                                value={props.formState.name}
                                error={props.errorState?.name}
                                name="name"
                                icon={<FaUserAlt />}
                            />
                        )}
                        <CustomInput
                            type="email"
                            placeholder="Email"
                            onChange={props.onChange}
                            value={props.formState.email}
                            name="email"
                            icon={<MdEmail />}
                            error={props.errorState?.email}
                        />
                        <CustomInput
                            type="password"
                            placeholder="Password"
                            onChange={props.onChange}
                            value={props.formState.password}
                            name="password"
                            error={props.errorState?.password}
                            icon={<ImKey />}
                        />

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
                            <p className="text-xs font-light mr-auto m-0">
                                Don't have an Account?{' '}
                                <Link
                                    to="/register"
                                    className="ml-1 font-semibold text-main-500 link-underline-effect-thin"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        ) : (
                            <p className="text-xs font-light mr-auto m-0">
                                Already have an Account?{' '}
                                <Link
                                    to="/login"
                                    className="ml-1 font-semibold text-main-500 link-underline-effect-thin"
                                >
                                    Log in here
                                </Link>
                            </p>
                        )}
                        <GoogleLogin />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthCard;
