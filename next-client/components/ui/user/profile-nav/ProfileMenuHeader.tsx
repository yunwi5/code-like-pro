import React from 'react';

import { useUserContext } from '../../../../store/context/UserContext';
import ProfilePicture from '../ProfilePicture';

// Profile info section that displays brief user information in the user profile dropdown menu.
const ProfileMenuHeader: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { userDetail } = useUserContext();

  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      <ProfilePicture
        size={'2.5rem'}
        alt={userDetail?.name || 'User'}
        picture={userDetail?.pictureUrl}
      />
      <div>
        <h3 className="text-lg leading-6 mb-1">{userDetail?.name}</h3>
        <p className="-mt-1 text-gray-400 text-sm">{userDetail?.email}</p>
      </div>
    </div>
  );
};

export default ProfileMenuHeader;
