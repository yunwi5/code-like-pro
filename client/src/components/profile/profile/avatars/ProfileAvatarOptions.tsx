import { AvatarImagesList } from '../../../../assets';
import { useProfileEditContext } from '../../../../store/context/ProfileEditContext';

const ProfileAvatarOptions: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { currentPicture, setPicture } = useProfileEditContext();

    let pictureOptions = currentPicture
        ? [currentPicture, ...AvatarImagesList]
        : AvatarImagesList;

    const handleAvatarSelect = (option: string) => {
        setPicture(option);
        onClose();
    };

    return (
        <div className="grid grid-cols-4 gap-x-2 gap-y-2 px-2 py-2">
            {pictureOptions.map((pictureOption, idx) => (
                <div
                    key={idx}
                    onClick={() => handleAvatarSelect(pictureOption)}
                    className="px-1 py-1 w-[6rem] hover:bg-gray-100"
                >
                    <img src={pictureOption} className="object-cover w-[5rem] h-[5rem]" />
                </div>
            ))}
        </div>
    );
};

export default ProfileAvatarOptions;
