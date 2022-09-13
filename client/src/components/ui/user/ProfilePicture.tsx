import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
    picture: string | undefined;
    size?: string;
}

// Displays profile picture of the user.
// If the user has a picture link to display, show the picture in the circle.
// If the user has no picture, show some placeholder user icon in the circle.
const ProfilePicture: React.FC<Props> = ({ size = '2.25rem', picture }) => {
    return (
        <div
            className="flex-center overflow-hidden rounded-full shadow bg-gray-700"
            style={{ width: size, height: size }}
        >
            {picture ? (
                <img src={picture} className="object-cover" />
            ) : (
                <FaUserCircle className="text-white" size={size} />
            )}
        </div>
    );
};

export default ProfilePicture;
