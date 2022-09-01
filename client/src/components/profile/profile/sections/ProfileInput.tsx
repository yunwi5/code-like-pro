import React from 'react';

interface Props {
    label: string;
    value: string;
    onChange(value: string): void;
}

const ProfileInput: React.FC<Props> = ({ label, value, onChange }) => {
    return (
        <div className={`flex flex-col gap-1`}>
            <h5 className="text-lg">{label}</h5>
            <input
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                className="!py-[0.4rem] rounded-md input max-w-[12rem]"
            />
        </div>
    );
};

export default ProfileInput;
