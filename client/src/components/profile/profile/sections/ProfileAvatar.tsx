import React, { useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { AvatarImages } from '../../../../assets';

interface Props {
    avatarId: string;
    setAvatarId: React.Dispatch<React.SetStateAction<string>>;
    isEditing: boolean;
}

const ProfileAvatar: React.FC<Props> = ({ avatarId, setAvatarId, isEditing }) => {
    return (
        <div className="absolute top-5 right-[1rem] flex-center flex-col gap-2">
            {isEditing && <ProfileAvatarEdit onSelect={(id: string) => setAvatarId(id)} />}
            <div className="flex-center bg-gray-200 rounded-full overflow-hidden border-2 border-main-200 w-[12rem] h-[12rem]">
                <img
                    src={(AvatarImages as any)[avatarId] || ''}
                    className="object-cover w-[10rem] h-[10rem]"
                />
            </div>
            <p className="text-lg">Avatar</p>
        </div>
    );
};

const ProfileAvatarEdit: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
    const [showOptions, setShowOptions] = useState(false);

    const avatarOptions = Object.entries(AvatarImages);

    return (
        <div className="absolute top-0 -left-2 text-3xl text-gray-600/90">
            <MdAddAPhoto
                className="cursor-pointer"
                onClick={() => setShowOptions((ps) => !ps)}
            />
            {showOptions && (
                <div className="absolute top-0 -left-[24rem] -translate-x-10 grid grid-cols-4 gap-x-2 gap-y-2 px-2 py-2 rounded-md bg-white shadow-lg cursor-pointer">
                    {avatarOptions.map(([avatarId, avatarImg]) => (
                        <div
                            onClick={() => onSelect(avatarId)}
                            className="px-1 py-1 w-[6rem] hover:bg-gray-100"
                        >
                            <img src={avatarImg} className="object-cover w-[5rem] h-[5rem]" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;
