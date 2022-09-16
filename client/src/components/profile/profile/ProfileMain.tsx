import React, { useState } from 'react';

import { patchUserDetail } from '../../../apis/user';
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
    const [picture, setPicture] = useState(userDetail?.pictureUrl || '');
    const [description, setDescription] = useState(userDetail?.description || '-');

    // Loading state
    if (!userDetail) return <ProfileLoader />;

    // Handle profile edit operation & request
    const handleProfileEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Send some HTTP Request to edit the profile.
        await patchUserDetail({ name: profileName, pictureUrl: picture, description });
    };

    // Calculate basic statistics for the profile page.
    const solvedExercisesCount = userDetail.submissions.filter((sub) => sub.correct).length;
    const createdExerciseCount = userDetail.exercises.length;
    const usedLanguages = getUsedLanguagesByUser(userDetail.submissions);

    return (
        <form className="relative flex-1" onSubmit={handleProfileEdit}>
            <div className="flex flex-col pl-7 pr-4 py-3">
                <ProfileHeader />
                <ProfileAvatar
                    isEditing={isEditing}
                    picture={picture}
                    setPicture={setPicture}
                />

                {/* Profile information */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-5 gap-y-[1.75rem] mt-3">
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
                            className="md:col-span-2"
                        />
                    )}

                    {isEditing ? (
                        <ProfileInput
                            label="About Me"
                            type="textarea"
                            value={description}
                            onChange={(newValue) => setDescription(newValue)}
                            className="md:col-span-2"
                        />
                    ) : (
                        <ProfileInfoItem
                            label="About Me"
                            value={description}
                            className="md:col-span-2"
                        />
                    )}

                    <ProfileInfoItem label="Email" value={userDetail.email} />
                    <ProfileInfoItem
                        label="Member Since"
                        value={getDateFormat(userDetail.createdAt)}
                    />
                    {/* Ranking data needs to be updated. */}
                    <ProfileInfoItem label="Languages" value={usedLanguages.join(', ')} />
                    <ProfileInfoItem label="Ranking Points" value="11,938 (2nd)" />

                    <ProfileInfoItem label="Exercises Created" value={createdExerciseCount} />
                    <ProfileInfoItem label="Exercises Solved" value={solvedExercisesCount} />
                </div>
            </div>

            <div className="flex md:justify-end px-3 py-3 md:pr-[5rem] border-t-[3px] border-gray-300">
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
