import React, { useId } from 'react';

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: string | null;
    labelText?: string;
}

const CustomInput: React.FC<Props> = (props) => {
    const { labelText, value, onChange, error, placeholder = '' } = props;
    const id = useId();

    return (
        <div className="flex flex-col gap-2">
            {labelText && <label htmlFor={id}>{labelText}</label>}
            <input
                id={id}
                className={`px-2 py-1 rounded-sm shadow-md focus:shadow-lg border-2 border-gray-300 focus-main ${
                    error ? 'border-rose-400 focus:outline-transparent' : ''
                }`}
                placeholder={placeholder}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange && onChange(e.target.value)
                }
            />
            {error && <p className="text-rose-500">{error}</p>}
        </div>
    );
};

export default CustomInput;
