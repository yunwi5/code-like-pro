import React from 'react';
import CustomInput from '../ui/inputs/CustomInput';
import Button from '../ui/buttons/Button';
import { GoogleIcon } from '../../assets/svg-icons/social-svgs';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { ImKey } from 'react-icons/im';

const btnClass = 'min-w-[10rem] my-3 w-full';

type FormState = {
    email: string;
    password: string;
    name?: string;
};

const AuthCard = (props: {
    isLogin: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formState: FormState; // form state that stores current value for each input
    errorState?: FormState; // form state that stores error for each input
}) => {
    return (
        <div className="flex justify-center">
            <div className="absolute z-0 bg-main-400 h-[65%] md:w-1/4 translate-x-2 translate-y-2"></div>
            <div className="absolute z-1 flex justify-center p-6 h-[65%] bg-grey-300 md:w-1/4 ">
                <div className="text-center w-full">
                    <h1 className="logo text-2xl font-light">CodeLikePro</h1>
                    {props.isLogin ? (
                        <div>
                            <h2 className="text-lg mt-3">Login</h2>
                            <p className="text-xs font-light">Sign in to your account</p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg mt-3">Register</h2>
                            <p className="text-xs font-light">Create an account</p>
                        </div>
                    )}
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
                        {props.isLogin ? (
                            <Button type="submit" className={btnClass}>
                                Login
                            </Button>
                        ) : (
                            <Button type="submit" className={btnClass}>
                                Register
                            </Button>
                        )}

                        {props.isLogin ? (
                            <p className="text-xs font-light mr-auto m-0">
                                Don't have an Account? Sign up here
                            </p>
                        ) : (
                            <p className="text-xs font-light mr-auto m-0">
                                Already have an Account? Log in here
                            </p>
                        )}

                        <Button className="btn-social mt-10">
                            <div className="flex align-center justify-between">
                                <div className="w-[25px]"></div>
                                Sign in with Google
                                <GoogleIcon height="25" width="25" />
                            </div>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthCard;
