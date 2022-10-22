import React from 'react';
import { BsTrophy } from 'react-icons/bs';

import useBadgeQuery from '../../../../../hooks/badges/useBadgeQuery';
import { IRankingOrder, IUserInfo } from '../../../../../models/interfaces';
import AnimationModal from '../../../modals/AnimationModal';
import Badges from '../../../../profile/badges/Badges';
import UserDetailHeader from './sections/UserDetailHeader';
import UserProfileInfo from './sections/UserProfileInfo';

interface Props {
    userInfo: IUserInfo;
    rankInfo: IRankingOrder | null;
    open: boolean;
    onClose: () => void;
}

const UserDetailModal: React.FC<Props> = ({ open, userInfo, rankInfo, onClose }) => {
    const { badges } = useBadgeQuery(userInfo._id);

    return (
        <AnimationModal
            open={open}
            onClose={onClose}
            direction="vertical"
            className="!rounded-md w-[clamp(25rem,50rem,96vw)] overflow-hidden"
        >
            <section className="flex flex-col text-gray-700">
                {/* Header consists of profile picture and username */}
                <UserDetailHeader userInfo={userInfo} />

                <div className="flex flex-col gap-2 pb-4 text-slate-700 bg-slate-200/90">
                    <div className="max-h-[25rem] max-w-[100%] px-4 lg:px-7 py-6 overflow-y-scroll">
                        {/* User profile information such as languages and ranking info */}
                        <UserProfileInfo
                            userInfo={userInfo}
                            rankInfo={rankInfo}
                            numBadges={badges.length}
                        />

                        {/* Show the badge section only if the user has some badges */}
                        {badges.length > 0 && (
                            <>
                                <h3 className="flex-start gap-1 mt-7 mb-3 text-2xl text-gray-700">
                                    <BsTrophy className="text-main-500" /> Awarded Badges
                                </h3>
                                <Badges
                                    badges={badges}
                                    className="ml-1"
                                    badgePerPage={6}
                                />
                            </>
                        )}
                    </div>

                    {/* Action buttons for closing modal */}
                    <div className="px-4 lg:px-7 pt-2 self-stretch flex justify-end">
                        <button
                            onClick={onClose}
                            className={
                                'px-3 py-2 text-lg rounded-sm bg-gray-700 hover:bg-gray-800 text-white shadow-md'
                            }
                        >
                            Close
                        </button>
                    </div>
                </div>
            </section>
        </AnimationModal>
    );
};

export default UserDetailModal;
