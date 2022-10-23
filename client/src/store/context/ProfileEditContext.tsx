import React, { useContext, useState } from 'react';
import { deleteImageByUrl, postUserImage } from '../../apis/image.api';
import { patchUserDetail } from '../../apis/user.api';
import { isAvatarImage } from '../../utils/image';
import { toastNotify } from '../../utils/notification';
import { useUserContext } from './UserContext';

interface IProfileEditContext {
    isLoading: boolean;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
    profileName: string;
    setProfileName: (name: string) => void;
    description: string;
    setDescription: (desc: string) => void;
    picture: string; // picture url
    setPicture: (pic: string) => void;
    previewSource: string | null;
    currentPicture: string;
    setPreviewSource: (preview: string) => void;
    onSubmitProfile: (e?: React.FormEvent) => void;
    cancelEdit: () => void;
}

const ProfileEditContext = React.createContext<IProfileEditContext>({
    isLoading: false,
    isEditing: false,
    setIsEditing: (editing: boolean) => {},
    profileName: '',
    setProfileName: (name: string) => {},
    description: '',
    setDescription: (desc: string) => {},
    picture: '', // picture url
    setPicture: (pic: string) => {},
    previewSource: null,
    currentPicture: '',
    setPreviewSource: (preview: string) => {},
    onSubmitProfile: () => {},
    cancelEdit: () => {},
});

export const useProfileEditContext = () => useContext(ProfileEditContext);

export const ProfileEditContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { userDetail, refetchDetail } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Only username and avatars are editable in the profile page.
    const [profileName, setProfileName] = useState(userDetail?.name || '');
    const [description, setDescription] = useState(userDetail?.description || '-');

    const [picture, setPicture] = useState(userDetail?.pictureUrl || '');
    // Preview source of a picture that the user uploaded (not null only if they uploaded)
    const [previewSource, setPreviewSource] = useState<string | null>(null);

    // Handle profile edit operation & request
    const handleProfileEdit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setIsEditing(false);

        setIsLoading(true);
        let imageToUpload = '';
        if (previewSource) {
            // Upload preview image to the server.
            const { ok, data } = await postUserImage({ image: previewSource });
            if (ok && data?.url) {
                imageToUpload = data.url;
            } else {
                toastNotify(
                    'Something went wrong while uploading your image...',
                    'error',
                );
            }
            setPicture(imageToUpload);
            setPreviewSource(null);
        } else {
            if (!isAvatarImage(userDetail?.pictureUrl || '')) {
                deleteImageByUrl(userDetail?.pictureUrl || '');
            }
            imageToUpload = picture;
        }

        // Send some HTTP Request to edit the profile.
        const { ok } = await patchUserDetail({
            name: profileName,
            pictureUrl: imageToUpload,
            description,
        });
        if (ok) {
            toastNotify('Profile updated!', 'success');
            refetchDetail();
        } else
            toastNotify('Something went wrong while updating your profile...', 'error');

        setIsLoading(false);
    };

    // Cancel editing the profile. Revert every profile info back to original.
    const handleCancelEdit = () => {
        setIsEditing(false);
        if (!userDetail) return;
        setProfileName(userDetail.name);
        setDescription(userDetail.description);
        if (userDetail.pictureUrl) setPicture(userDetail.pictureUrl);
        setPreviewSource(null);
    };

    const currentPicture = previewSource || picture;

    const value = {
        isEditing,
        setIsEditing,
        isLoading,
        profileName,
        setProfileName,
        description,
        setDescription,
        picture,
        setPicture,
        previewSource,
        setPreviewSource,
        currentPicture,
        onSubmitProfile: handleProfileEdit,
        cancelEdit: handleCancelEdit,
    };

    return (
        <ProfileEditContext.Provider value={value}>
            {children}
        </ProfileEditContext.Provider>
    );
};
