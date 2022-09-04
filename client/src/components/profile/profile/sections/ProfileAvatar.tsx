import React, { useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { AvatarImagesList } from '../../../../assets';
import { useUserContext } from '../../../../store/context/UserContext';

interface Props {
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>;
    isEditing: boolean;
}

const ProfileAvatar: React.FC<Props> = ({ picture, setPicture, isEditing }) => {
    return (
        <div className="absolute top-5 right-[4rem] flex-center flex-col gap-2">
            {isEditing && <ProfileAvatarEdit onSelect={(pic: string) => setPicture(pic)} />}
            <div className="flex-center bg-gray-200 rounded-full overflow-hidden border-2 border-main-200 w-[12rem] h-[12rem]">
                <img src={picture || ''} className="object-cover w-[10rem] h-[10rem]" />
            </div>
            <p className="text-lg">Avatar</p>
        </div>
    );
};

const ProfileAvatarEdit: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
    const originalPicture = useUserContext()?.user?.pictureUrl;
    const [showOptions, setShowOptions] = useState(false);

    const pictureOptions = originalPicture
        ? [originalPicture, ...AvatarImagesList]
        : AvatarImagesList;

    return (
        <div className="absolute top-0 -left-2 text-3xl text-gray-600/90">
            <MdAddAPhoto
                className="cursor-pointer"
                onClick={() => setShowOptions((ps) => !ps)}
            />
            {showOptions && (
                <div className="absolute top-0 -left-[24rem] -translate-x-10 grid grid-cols-4 gap-x-2 gap-y-2 px-2 py-2 rounded-md bg-white shadow-lg cursor-pointer">
                    {pictureOptions.map((pictureOption) => (
                        <div
                            onClick={() => onSelect(pictureOption)}
                            className="px-1 py-1 w-[6rem] hover:bg-gray-100"
                        >
                            <img
                                src={pictureOption}
                                className="object-cover w-[5rem] h-[5rem]"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;
