import React from 'react';
import useUserInfoQuery from '../../../../hooks/user/useUserInfoQuery';
import ProfilePicture from '../ProfilePicture';
import ProfileHoverModal from './hover-modal/ProfileHoverModal';
import styles from './ProfileView.module.scss';

interface Props {
    user: { _id: string; name: string; pictureUrl?: string };
    size?: string;
    className?: string;
    hoverModalClassName?: string; // override hover modal styles, optional
}

const ProfileView: React.FC<Props> = ({
    user,
    size,
    className = '',
    hoverModalClassName,
}) => {
    const { user: userInfo } = useUserInfoQuery(user._id);

    if (!user) return <div>User not found</div>;

    return (
        <div
            className={`${styles['profile-view']} relative flex-start gap-3 items-center cursor-pointer ${className}`}
        >
            <ProfilePicture
                picture={user.pictureUrl ?? userInfo?.pictureUrl}
                size={size ?? '2.5rem'}
            />
            <span className={styles['user-name']}>{user.name}</span>
            {userInfo && (
                <ProfileHoverModal
                    className={`hidden sm:block ${styles['hover-modal']} ${hoverModalClassName}`}
                    userInfo={userInfo}
                />
            )}
        </div>
    );
};

export default ProfileView;
