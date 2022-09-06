import React, { useState } from 'react';
import { patchUserDetail } from '../../../apis/user';
import { AvatarImagesList } from '../../../assets';
import { useUserContext } from '../../../store/context/UserContext';
import { getDateFormat } from '../../../utils/datetime';
import { getUsedLanguagesByUser } from '../../../utils/language';
import Button from '../../ui/buttons/Button';
import ProfileLoader from '../ProfileLoader';
import ProfileAvatar from './sections/ProfileAvatar';
import ProfileInfoItem from './sections/ProfileInfoItem';
import ProfileInput from './sections/ProfileInput';

const ProfileMain = () => {
    const { userDetail } = useUserContext();
    const [isEditing, setIsEditing] = useState(false);

    // Only username and avatars are editable in the profile page.
    const [profileName, setProfileName] = useState(userDetail?.name || '');
    const [picture, setPicture] = useState(userDetail?.pictureUrl || AvatarImagesList[0]);

    // Loading state
    if (!userDetail) return <ProfileLoader />;

    // Handle profile edit operation & request
    const handleProfileEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New name:', profileName, 'New avatar:', picture);
        // Send some HTTP Request to edit the profile.
        const result = await patchUserDetail({ name: profileName, pictureUrl: picture });
        console.log('Patch result:', result);
    };

    // Calculate basic statistics for the profile page.
    const solvedExercisesCount = userDetail.submissions.filter((sub) => sub.correct).length;
    const usedLanguages = getUsedLanguagesByUser(userDetail.submissions);

    return (
        <form className="relative flex-1" onSubmit={handleProfileEdit}>
            <div className="pl-7 pr-4 py-3">
                <ProfileHeader />
                <ProfileAvatar
                    isEditing={isEditing}
                    picture={picture}
                    setPicture={setPicture}
                />

                {/* Profile information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[1.75rem] mt-3">
                    {isEditing ? (
                        <ProfileInput
                            label="Username"
                            value={profileName}
                            onChange={(newValue) => setProfileName(newValue)}
                        />
                    ) : (
                        <ProfileInfoItem
                            label="Username"
                            value={profileName}
                            className="col-span-2"
                        />
                    )}

                    <ProfileInfoItem
                        label="Email"
                        value={userDetail.email}
                        className="col-span-2"
                    />
                    <ProfileInfoItem label="Languages" value={usedLanguages.join(', ')} />

                    {/* Ranking data needs to be updated. */}
                    <ProfileInfoItem label="Ranking Points" value="11,938 (2nd)" />
                    <ProfileInfoItem
                        label="Member Since"
                        value={getDateFormat(userDetail.createdAt)}
                    />
                    <ProfileInfoItem label="Exercises Solved" value={solvedExercisesCount} />
                </div>
            </div>

            <div className="flex justify-end px-3 py-3 pr-[5rem] border-t-[3px] border-gray-300">
                <Button className="rounded-sm" onClick={() => setIsEditing((ps) => !ps)}>
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                </Button>
            </div>
        </form>
    );
};

const ProfileHeader = () => (
    <div className="flex flex-col">
        <h2 className="text-xl">My Profile</h2>
        <p className="text-gray-500">Your profile is publicly shown to other users.</p>
    </div>
);

export default ProfileMain;
