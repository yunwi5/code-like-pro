import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { MdAddAPhoto, MdPhotoCamera } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

import { useProfileEditContext } from '../../../../store/context/ProfileEditContext';
import { toBase64Image } from '../../../../utils/image.util';
import { toastNotify } from '../../../../utils/notification.util';
import FileInput from '../../../ui/inputs/FileInput';

import ProfileAvatarOptions from './ProfileAvatarOptions';

const ProfileAvatarEdit: React.FC = () => {
  const { isLoading, setPreviewSource } = useProfileEditContext();

  const [fileInput, setFileInput] = useState<File | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selectedFile = files[0];
    setFileInput(selectedFile);

    let pictureSource = '';
    // Get image source from the input file.
    try {
      pictureSource = (await toBase64Image(selectedFile)) as string;
      setPreviewSource(pictureSource);
    } catch (err) {
      console.log(err);
      return toastNotify('Something went wrong while uploading your image...', 'error');
    }
  };

  return (
    <div className="absolute top-0 -left-2 text-3xl text-gray-600/90">
      <MdAddAPhoto className="cursor-pointer" onClick={() => setShowOptions((ps) => !ps)} />
      {showOptions && (
        <ClickAwayListener onClickAway={() => setShowOptions(false)}>
          <div className="z-10 flex flex-col items-center gap-3 w-max absolute top-0 left-0 md:-left-[24rem] md:-translate-x-10 pb-3 px-2 rounded-md bg-white shadow-lg cursor-pointer">
            {!isLoading && <ProfileAvatarOptions onClose={() => setShowOptions(false)} />}
            {isLoading && (
              <div className="flex-center w-[24rem] h-[15rem]">
                <ClipLoader size={100} color="#5552e4" />
              </div>
            )}

            <FileInput onChange={handleImageUpload} file={fileInput}>
              <span className="flex-start gap-2 text-base">
                <MdPhotoCamera className="text-2xl" /> Custom Photo
              </span>
            </FileInput>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default ProfileAvatarEdit;
