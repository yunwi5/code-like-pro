import React from 'react';

import { isAvatarImage } from '../../../../utils/image';
import ProfileAvatarEdit from './ProfileAvatarEdit';

interface Props {
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>;
    isEditing: boolean;
}

const ProfileAvatar: React.FC<Props> = ({ picture, setPicture, isEditing }) => {
    return (
        <div className="self-start md:absolute top-5 right-[4rem] mt-10 flex items-center flex-col gap-2">
            {isEditing && (
                <ProfileAvatarEdit
                    currentPicture={picture}
                    onSelect={(pic: string) => setPicture(pic)}
                />
            )}
            <div className="flex-center bg-gray-200 rounded-full overflow-hidden border-2 border-main-200 w-[12rem] h-[12rem]">
                <img
                    src={picture || ''}
                    className={`object-cover ${
                        isAvatarImage(picture)
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
