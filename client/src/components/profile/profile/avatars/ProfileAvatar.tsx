import React from 'react';
import { useProfileEditContext } from '../../../../store/context/ProfileEditContext';

import { isAvatarImage } from '../../../../utils/image';
import ProfileAvatarEdit from './ProfileAvatarEdit';

const ProfileAvatar: React.FC = () => {
    const { currentPicture, isEditing } = useProfileEditContext();

    return (
        <div className="self-start md:absolute top-5 right-[4rem] mt-10 flex items-center flex-col gap-2">
            {isEditing && <ProfileAvatarEdit />}
            <div className="flex-center bg-gray-200 rounded-full overflow-hidden border-2 border-main-200 w-[12rem] h-[12rem]">
                <img
                    src={currentPicture || ''}
                    className={`object-cover ${
                        isAvatarImage(currentPicture)
                            ? 'w-[10rem] h-[10rem]'
                            : 'min-w-full min-h-full object-cover'
                    }`}
                />
            </div>
            <p className="text-lg">Avatar</p>
        </div>
    );
};

export default ProfileAvatar;
