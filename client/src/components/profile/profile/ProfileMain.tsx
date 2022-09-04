import React, { useState } from 'react';
import { AvatarIds } from '../../../assets';
import Button from '../../ui/buttons/Button';
import ProfileAvatar from './sections/ProfileAvatar';
import ProfileInfoItem from './sections/ProfileInfoItem';
import ProfileInput from './sections/ProfileInput';

const ProfileMain = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Only username and avatars are editable in the profile page.
    const [profileName, setProfileName] = useState('Camille');
    const [avatarId, setAvatarId] = useState(AvatarIds[0]);

    const handleProfileEdit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New name:', profileName, 'New avatar:', avatarId);
        // Send some HTTP Request to edit the profile.
    };

    return (
        <section className="relative flex-1">
            <div className="pl-7 pr-4 py-3">
                <ProfileHeader />
                <ProfileAvatar
                    isEditing={isEditing}
                    avatarId={avatarId}
                    setAvatarId={setAvatarId}
                />

                {/* Profile information */}
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-y-[1.75rem] mt-3"
                    onSubmit={handleProfileEdit}
                >
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
                        value="camil@gmail.com"
                        className="col-span-2"
                    />
                    <ProfileInfoItem label="Languages" value="Python, Java, C++" />
                    <ProfileInfoItem label="Ranking Points" value="11,938 (2nd)" />
                    <ProfileInfoItem
                        label="Member Since"
                        value={new Date().toLocaleDateString('en-us', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        })}
                    />
                    <ProfileInfoItem label="Exercises Solved" value="1,259" />
                </form>
            </div>

            <div className="flex justify-end px-3 py-3 pr-[5rem] border-t-[3px] border-gray-300">
                <Button className="rounded-sm" onClick={() => setIsEditing((ps) => !ps)}>
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                </Button>
            </div>
        </section>
    );
};

const ProfileHeader = () => (
    <div className="flex flex-col">
        <h2 className="text-xl">My Profile</h2>
        <p className="text-gray-500">Your profile is publicly shown to other users.</p>
    </div>
);

export default ProfileMain;
