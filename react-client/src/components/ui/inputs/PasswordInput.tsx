import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import AuthInput from './AuthInput';

type PasswordInputProps = {
    placeholder: string;
    className?: string;
    name?: string;
    value?: string;
    id?: string;
    error?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = (props: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPassword ? 'text' : 'password';
    const icon = (
        <div
            onClick={() => setShowPassword((ps) => !ps)}
            className={`p-3 text-[1.5rem] translate-x-3 rounded-full cursor-pointer hover:bg-gray-500/20 hover:shadow-md`}
        >
            {showPassword ? <BiHide className="text-rose-400" /> : <BiShow />}
        </div>
    );

    return <AuthInput {...props} type={inputType} icon={icon} />;
};

export default PasswordInput;
