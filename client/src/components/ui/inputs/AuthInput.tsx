import React from 'react';

const AuthInput = (props: {
    type: string;
    placeholder: string;
    className?: string;
    labelText?: string;
    name?: string;
    value?: string;
    id?: string;
    error?: string | null;
    icon?: JSX.Element;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const errorClass = props.error ? '!border-rose-400 !bg-rose-50 focus:outline-none' : '';

    return (
        <div className="relative flex flex-col gap-1 my-3">
            <input
                className={`w-full p-3 text-sm h-9 bg-grey-200 border-grey-700 border-b-[1.5px] ${errorClass}`}
                id={props.id}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
            {/* Optional gray icon shown in the mock up */}
            {props.icon && (
                <span
                    className={
                        'absolute text-[0.9rem] text-gray-400 top-[calc(2.25rem/2)] right-2 -translate-y-[50%]'
                    }
                >
                    {props.icon}
                </span>
            )}

            {/* Show form error if exists */}
            {props.error && <p className="text-left text-rose-500 text-sm">{props.error}</p>}
        </div>
    );
};

export default AuthInput;
