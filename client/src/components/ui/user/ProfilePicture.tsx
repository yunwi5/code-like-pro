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
            {isValidImagePath(picture) && (
                <img src={picture} className="min-w-full min-h-full object-cover" />
            )}
        </div>
    );
};

// Check if the image path is valid, to prevent broken image to be displayed.
function isValidImagePath(pictureUrl: string | undefined) {
    if (!pictureUrl) return false;

    // External image url pattern
    const externalUrlPattern =
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    // App internal avatar path pattern
    const avatarPattern = /\/src\/assets\/avatars\/.+/;

    // If the pictureUrl is a valid image path, return true
    if (pictureUrl.match(externalUrlPattern) || pictureUrl.match(avatarPattern))
        return true;

    // if the pictureUrl is invalid, return false
    return false;
}

export default ProfilePicture;
