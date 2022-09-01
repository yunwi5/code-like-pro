import React from 'react';

interface Props {
    label: string;
    value: string;
    className?: string;
}

const ProfileInfoItem: React.FC<Props> = ({ label, value, className = '' }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <h5 className="text-lg">{label}</h5>
            <p className="text-gray-500">{value}</p>
        </div>
    );
};

export default ProfileInfoItem;
