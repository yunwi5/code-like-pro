import React, { useMemo } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsCodeSlash } from 'react-icons/bs';
import { IoPodiumOutline } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

import useRanking from '../../../../../hooks/ranking/useRanking';
import { IUserInfo } from '../../../../../models/interfaces';
import { getDateFormat } from '../../../../../utils/datetime';
import { numberSuffix } from '../../../../../utils/number';
import LanguageLabel from '../../../labels/LanguageLabel';
import ProfilePicture from '../../ProfilePicture';
import Button from '../../../buttons/Button';
import styles from './ProfileHoverModal.module.scss';

interface Props {
    userInfo: IUserInfo;
    className?: string;
}

// Profile modal that appears when hovering the user profile picture and name.
const ProfileHoverModal: React.FC<Props> = ({ userInfo, className = '' }) => {
    const { getUserRank } = useRanking();

    const userRankData = useMemo(() => {
        return getUserRank(userInfo._id);
    }, [getUserRank, userInfo._id]);

    return (
        <div
            className={`${styles.modal} absolute top-[calc(100%+0.75rem)] left-[50%] translate-x-[-10%] min-w-[25rem] bg-white border-2 border-gray-200/90 rounded shadow hover:shadow-lg ${className}`}
        >
            <div className={styles.triangle}></div>
            <div className="flex items-center gap-5 px-3 pt-3 pb-2 border-b-2 border-b-gray-200">
                <ProfilePicture picture={userInfo.pictureUrl} size={'3rem'} />
                <div>
                    <h3 className="text-xl text-gray-500 font-semibold">
                        {userInfo.name}
                    </h3>
                    <p className="text-gray-400">{userInfo.description || '-'}</p>
                </div>
            </div>
            <div className="bg-slate-100 grid grid-cols-2 gap-x-8 gap-y-3 px-4 py-2">
                <div className="flex flex-col">
                    <strong className="flex-start gap-1 text-gray-500/90">
                        <AiOutlineMail className="text-main-500 text-[1.2em]" /> Email
                    </strong>
                    <a
                        href={`mailto:${userInfo.email}`}
                        className="w-fit link-underline-effect hover:text-main-500 whitespace-pre-wrap"
                    >
                        {userInfo.email}
                    </a>
                </div>
                <div className="flex flex-col">
                    <strong className="flex-start gap-1 dark:text-gray-500/90">
                        <MdDateRange className="text-main-500 text-[1.2em]" />
                        Member Since
                    </strong>
                    ''
                    <p>{getDateFormat(userInfo.createdAt)}</p>
                </div>
                {userRankData ? (
                    <div className="flex flex-col">
                        <strong className="flex-start gap-1 text-gray-500/90">
                            <IoPodiumOutline className="text-main-500 text-[1.2em]" />
                            Rank
                        </strong>
                        <p>
                            {userRankData.creationPoints + userRankData.solvingPoints} pts
                            ({numberSuffix(userRankData.order)})
                        </p>
                    </div>
                ) : (
                    <ClipLoader color="#5552e4" size={35} />
                )}
                <div className="flex flex-col">
                    <strong className="flex-start gap-1 marker:text-gray-500/90">
                        <BsCodeSlash className="text-main-500 text-[1.2em]" />
                        Languages
                    </strong>
                    <div className="flex items-center gap-2">
                        {userInfo.languages?.sort().map((lang) => (
                            <LanguageLabel
                                key={lang}
                                className="text-sm"
                                language={lang}
                                size={'25px'}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-span-2 mt-1">
                    <Button size="small">View Detail</Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHoverModal;
