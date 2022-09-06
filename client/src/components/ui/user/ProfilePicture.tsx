import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useUserContext } from '../../../store/context/UserContext';

interface Props {
    size?: string;
}

const ProfilePicture: React.FC<Props> = ({ size = '2.25rem' }) => {
    const { userDetail } = useUserContext();

    return (
        <div
            className="flex-center overflow-hidden rounded-full bg-gray-700"
            style={{ width: size, height: size }}
        >
            {userDetail?.pictureUrl ? (
                <img src={userDetail.pictureUrl} className="object-cover" />
            ) : (
                <FaUserCircle className="text-white" size={size} />
            )}
        </div>
    );
};

export default ProfilePicture;
