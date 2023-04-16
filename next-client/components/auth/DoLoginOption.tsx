import React, { FC } from 'react';

type Props = {
  doLogin: boolean;
  setDoLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

// Only for register. Option to allow users to login right after register without extra steps
const DoLoginOption: FC<Props> = ({ doLogin, setDoLogin }) => {
  return (
    <div className="flex items-center gap-2 mb-5">
      <input
        id="do-login"
        type="checkbox"
        className="w-[0.95rem] h-[0.95rem]"
        checked={doLogin}
        onChange={() => setDoLogin((ps) => !ps)}
      />
      <label className="text-sm text-gray-500" htmlFor="do-login">
        Get logged in after register
      </label>
    </div>
  );
};

export default DoLoginOption;
