import React from 'react';

type AuthInputProps = {
  type: string;
  placeholder: string;
  className?: string;
  name?: string;
  value?: string;
  id?: string;
  error?: string | null;
  icon?: JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput = (props: AuthInputProps) => {
  const { type, placeholder, name, value, id, error, icon, onChange } = props;

  const errorClass = error ? '!border-rose-400 !bg-rose-50 focus:outline-none' : '';

  return (
    <div className="relative flex flex-col gap-1">
      <input
        className={`w-full px-4 py-6 h-9 bg-grey-200/90 border-grey-700 border-b-[1.5px] rounded-sm ${errorClass}`}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {icon && (
        <div
          className={
            'absolute text-[1.15rem] text-gray-400 top-[calc(3rem/2)] right-2 -translate-y-[50%]'
          }
        >
          {icon}
        </div>
      )}

      {error && <p className="text-left text-rose-500 text-sm">{error}</p>}
    </div>
  );
};

export default AuthInput;
