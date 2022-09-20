import { useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { postUserImage } from '../../../../apis/image';
import { toastNotify } from '../../../../utils/notification';
import { toBase64Image } from '../../../../utils/image';
import ProfileAvatarOptions from './ProfileAvatarOptions';

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

export default ProfileAvatarEdit;
