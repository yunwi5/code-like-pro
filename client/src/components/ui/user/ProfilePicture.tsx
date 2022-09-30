import React from 'react';
import { FaUser } from 'react-icons/fa';

interface Props {
    picture: string | undefined;
    size?: string;
    className?: string;
}

// Displays profile picture of the user.
// If the user has a picture link to display, show the picture in the circle.
// If the user has no picture, show some placeholder user icon in the circle.
const ProfilePicture: React.FC<Props> = ({ size = '2rem', picture, className = '' }) => {
    return (
        <div
            className={`flex-center shrink-0 overflow-hidden rounded-full shadow bg-gray-700 ${className}`}
            style={{ width: size, height: size }}
        >
            <FaUser className="text-gray-200 scale-90 translate-y-1" size={size} />
            {picture && (
                <img src={picture} className="min-w-full min-h-full object-cover" />
            )}
        </div>
    );
};

export default ProfilePicture;
