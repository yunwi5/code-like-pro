import React from 'react';
import { useProfileEditContext } from '../../../../store/context/ProfileEditContext';

import { isAvatarImage } from '../../../../utils/image';
import ProfilePicture from '../../../ui/user/ProfilePicture';
import ProfileAvatarEdit from './ProfileAvatarEdit';

const ProfileAvatar: React.FC = () => {
    const { currentPicture, isEditing } = useProfileEditContext();

    return (
        <div className="self-start relative md:absolute md:top-5 md:right-[4rem] mt-10 flex items-center flex-col gap-2">
            {isEditing && <ProfileAvatarEdit />}
            <div className="flex-center bg-gray-200 rounded-full overflow-hidden border-2 border-main-200 w-[12rem] h-[12rem]">
                <ProfilePicture
                    picture={currentPicture}
                    size={isAvatarImage(currentPicture) ? '12rem' : '13rem'}
                    alt="Profile picture"
                />
            </div>
            <p className="text-lg">Avatar</p>
        </div>
    );
};

export default ProfileAvatar;
