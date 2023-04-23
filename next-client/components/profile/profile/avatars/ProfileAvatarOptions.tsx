import ProfilePicture from '@/components/ui/user/ProfilePicture';

import { AvatarImageIdList } from '../../../../assets/avatars';
import { useProfileEditContext } from '../../../../store/context/ProfileEditContext';

const ProfileAvatarOptions: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentPicture, setPicture } = useProfileEditContext();

  const pictureOptions = currentPicture
    ? [currentPicture, ...AvatarImageIdList]
    : AvatarImageIdList;

  const handleAvatarSelect = (option: string) => {
    setPicture(option);
    onClose();
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-2 gap-y-2 px-2 py-2">
      {pictureOptions.map((pictureOption, idx) => (
        <div
          key={idx}
          onClick={() => handleAvatarSelect(pictureOption)}
          className="px-1 py-1 w-[6rem] hover:bg-gray-100"
        >
          <ProfilePicture
            className="!rounded-none bg-transparent"
            size="5rem"
            picture={pictureOption}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileAvatarOptions;
