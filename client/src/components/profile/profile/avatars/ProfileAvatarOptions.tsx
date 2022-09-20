import { AvatarImagesList } from '../../../../assets';

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

export default ProfileAvatarOptions;
