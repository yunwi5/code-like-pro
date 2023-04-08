import React, { useMemo, useState } from 'react';
import useRanking from '../../../../hooks/ranking/useRanking';
import useUserInfoQuery from '../../../../hooks/user/useUserInfoQuery';
import ProfilePicture from '../ProfilePicture';
import UserDetailModal from './detail-modal/UserDetailModal';
import ProfileHoverModal from './hover-modal/ProfileHoverModal';
import styles from './ProfileView.module.scss';

interface Props {
  user: { _id: string; name: string; pictureUrl?: string };
  size?: string;
  className?: string;
  hoverModalClassName?: string; // override hover modal styles, optional
}

// Viewing other user's profile (including the user itself)
const ProfileView: React.FC<Props> = ({
  user,
  size,
  className = '',
  hoverModalClassName,
}) => {
  const { user: userInfo } = useUserInfoQuery(user._id);
  const { getUserRank } = useRanking();

  // Ranking information
  const rankInfo = useMemo(() => {
    return getUserRank(userInfo?._id || '');
  }, [getUserRank, userInfo?._id]);

  // User detail modal
  const [showModal, setShowModal] = useState(false);

  // currying function to handle the user modal state
  const handleModal = (show: boolean) => () => setShowModal(show);

  if (!user) return <div>User not found</div>;

  return (
    <>
      <div
        className={`${styles['profile-view']} relative flex-start gap-3 items-center cursor-pointer ${className}`}
      >
        <ProfilePicture
          onClick={handleModal(true)}
          picture={user.pictureUrl ?? userInfo?.pictureUrl}
          alt={`${user.name} profile`}
          size={size ?? '2.5rem'}
        />
        <span onClick={handleModal(true)} className={styles['user-name']}>
          {user.name}
        </span>
        {userInfo && (
          <ProfileHoverModal
            rankInfo={rankInfo}
            userInfo={userInfo}
            onShowDetail={handleModal(true)}
            className={`hidden sm:block ${styles['hover-modal']} ${hoverModalClassName}`}
          />
        )}
      </div>

      {userInfo && (
        <UserDetailModal
          userInfo={userInfo}
          rankInfo={rankInfo}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProfileView;
