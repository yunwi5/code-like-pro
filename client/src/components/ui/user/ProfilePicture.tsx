import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useUserContext } from '../../../store/context/UserContext';

interface Props {
    size?: string;
}

const ProfilePicture: React.FC<Props> = ({ size = '2.25rem' }) => {
    const { user } = useUserContext();

    return (
        <div
            className="flex-center overflow-hidden rounded-full bg-gray-700"
            style={{ width: size, height: size }}
        >
            {user?.pictureUrl && <img src={user.pictureUrl} className="object-cover" />}
            {!user?.pictureUrl && <FaUserCircle className="text-white" size={size} />}
        </div>
    );
};

export default ProfilePicture;
