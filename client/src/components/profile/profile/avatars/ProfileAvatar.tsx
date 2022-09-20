import React, { useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { postUserImage } from '../../../../apis/image';

import { AvatarImagesList } from '../../../../assets';
import { toastNotify } from '../../../../utils/notification';
import { toBase64Image } from '../../../../utils/string-utils/image';

interface Props {
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>;
    isEditing: boolean;
}

function isAvatarImage(picture: string) {
    return AvatarImagesList.includes(picture);
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

// Needs refactoring.
const ProfileAvatarEdit: React.FC<{
    onSelect: (id: string) => void;
    currentPicture: string;
}> = ({ currentPicture, onSelect }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleAvatarSelect = (picture: string) => {
        onSelect(picture);
        setShowOptions(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const selectedFile = files[0];

        setIsLoading(true);
        let pictureSource = '';
        // Get image source from the input file.
        try {
            pictureSource = (await toBase64Image(selectedFile)) as string;
        } catch (err) {
            console.log(err);
            return toastNotify('Something went wrong while uploading your image...', 'error');
        }

        // Upload the image.
        const { ok, data } = await postUserImage({ image: pictureSource });
        if (ok && data?.url) {
            onSelect(data.url);
            setShowOptions(false);
        }
        setIsLoading(false);
    };

    return (
        <div className="absolute top-0 -left-2 text-3xl text-gray-600/90">
            <MdAddAPhoto
                className="cursor-pointer"
                onClick={() => setShowOptions((ps) => !ps)}
            />
            {showOptions && (
                <div className="flex flex-col items-center pb-3 px-2 gap-3 absolute top-0 -left-[24rem] -translate-x-10 rounded-md bg-white shadow-lg cursor-pointer">
                    {!isLoading && (
                        <ProfileAvatarOptions
                            currentPicture={currentPicture}
                            onSelect={handleAvatarSelect}
                        />
                    )}
                    {isLoading && (
                        <div className="flex-center w-[24rem] h-[15rem]">
                            <ClipLoader size={100} color="#5552e4" />
                        </div>
                    )}
                    <div className="text-base">
                        <input onChange={handleImageUpload} type="file" name="image" />
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileAvatarOptions: React.FC<{
    onSelect: (pic: string) => void;
    currentPicture: string;
}> = ({ onSelect, currentPicture }) => {
    let pictureOptions = currentPicture
        ? [currentPicture, ...AvatarImagesList]
        : AvatarImagesList;

    return (
        <div className="grid grid-cols-4 gap-x-2 gap-y-2 px-2 py-2">
            {pictureOptions.map((pictureOption, idx) => (
                <div
                    key={idx}
                    onClick={() => onSelect(pictureOption)}
                    className="px-1 py-1 w-[6rem] hover:bg-gray-100"
                >
                    <img src={pictureOption} className="object-cover w-[5rem] h-[5rem]" />
                </div>
            ))}
        </div>
    );
};

export default ProfileAvatar;
