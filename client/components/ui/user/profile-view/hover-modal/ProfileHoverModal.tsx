import React from 'react';
import { BsCodeSlash, BsFileEarmarkCode } from 'react-icons/bs';
import { IoPodiumOutline } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

import { IRankingOrder, IUserInfo } from '../../../../../models/interfaces';
import { getDateFormat } from '../../../../../utils/datetime.util';
import { numberSuffix } from '../../../../../utils/number.util';
import Button from '../../../buttons/Button';
import LanguageLabel from '../../../icons/LanguageIcon';
import ProfilePicture from '../../ProfilePicture';

import styles from './ProfileHoverModal.module.scss';

interface Props {
  userInfo: IUserInfo;
  rankInfo: IRankingOrder | null;
  onShowDetail(): void; // trigger the event to show the user detail modal
  className?: string;
}

// Profile modal that appears when hovering the user profile picture and name.
const ProfileHoverModal: React.FC<Props> = ({
  userInfo,
  rankInfo,
  onShowDetail,
  className = '',
}) => {
  return (
    <div
      className={`${styles.modal} absolute top-[calc(100%+0.75rem)] left-[50%] translate-x-[-10%] min-w-[26rem] bg-white border-2 border-gray-200/90 rounded shadow hover:shadow-lg ${className}`}
    >
      <div className={styles.triangle}></div>
      <div className="flex items-center gap-5 px-3 pt-3 pb-2 border-b-2 border-b-gray-200">
        <ProfilePicture alt={userInfo.name} picture={userInfo.pictureUrl} size={'3rem'} />
        <div>
          <h3 className="text-xl text-gray-500 font-semibold">{userInfo.name}</h3>
          <p className="text-gray-400">{userInfo.description?.slice(0, 40) || '-'}</p>
        </div>
      </div>
      <div className="bg-slate-100 grid grid-cols-2 gap-x-8 gap-y-3 px-4 py-2">
        <div className="flex flex-col">
          <strong className="flex-start gap-1 dark:text-gray-500/90">
            <MdDateRange className="text-main-500 text-[1.2em]" />
            Member Since
          </strong>
          <p>{getDateFormat(userInfo.createdAt)}</p>
        </div>
        {rankInfo ? (
          <div className="flex flex-col">
            <strong className="flex-start gap-1 text-gray-500/90">
              <IoPodiumOutline className="text-main-500 text-[1.1em]" />
              Rank
            </strong>
            <p>
              {rankInfo.creationPoints + rankInfo.solvingPoints} pts ({numberSuffix(rankInfo.order)}
              )
            </p>
          </div>
        ) : (
          <ClipLoader color="#5552e4" size={35} />
        )}
        <div className="flex flex-col">
          <strong className="flex-start gap-1 dark:text-gray-500/90">
            <BsFileEarmarkCode className="text-main-500" />
            Challenges Solved
          </strong>
          <p>{userInfo.solvedExercises} challenges</p>
        </div>
        <div className="flex flex-col">
          <strong className="flex-start gap-1 marker:text-gray-500/90">
            <BsCodeSlash className="text-main-500 text-[1.2em]" />
            Languages
          </strong>
          <div className="flex items-center gap-2">
            {userInfo.languages?.sort().map((lang) => (
              <LanguageLabel key={lang} className="text-sm" language={lang} size={'25px'} />
            ))}
          </div>
        </div>
        <div className="col-span-2 mt-1">
          <Button onClick={onShowDetail} size="small">
            View Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHoverModal;
