import React from 'react';
import { BsInfoCircle, BsTrophy } from 'react-icons/bs';
import useBadgeQuery from '../../../../../hooks/badges/useBadgeQuery';
import { IRankingOrder, IUserInfo } from '../../../../../models/interfaces';
import { getDateFormat } from '../../../../../utils/datetime';
import { numberSuffix } from '../../../../../utils/number';
import Badges from '../../../../profile/badges/Badges';
import LanguageIcon from '../../../icons/LanguageIcon';
import AnimationModal from '../../../modals/AnimationModal';
import ProfilePicture from '../../ProfilePicture';

interface Props {
    userInfo: IUserInfo;
    rankInfo: IRankingOrder | null;
    open: boolean;
    onClose: () => void;
}

const UserDetailModal: React.FC<Props> = ({ open, userInfo, rankInfo, onClose }) => {
    const { badges } = useBadgeQuery(userInfo._id);

    const rankingPoints =
        (rankInfo?.creationPoints || 0) + (rankInfo?.solvingPoints || 0);

    return (
        <AnimationModal
            open={open}
            onClose={onClose}
            className="!rounded-md w-[clamp(25rem,50rem,96vw)] overflow-hidden"
        >
            <section className="flex flex-col text-gray-700">
                <header className="flex-start gap-4 px-7 py-4 shadow-md border-b-2 border-main-300/90">
                    <ProfilePicture
                        className=""
                        size="3.5rem"
                        picture={userInfo.pictureUrl}
                        alt={userInfo.name}
                    />
                    <h2 className="text-3xl flex-start gap-2">{userInfo.name}</h2>
                </header>

                <div className="flex flex-col gap-2 px-7 pb-4 text-slate-700 bg-slate-200/90">
                    <div className="max-h-[23rem] py-6 overflow-y-scroll">
                        <h3 className="flex-start gap-[0.35rem] text-2xl text-gray-700">
                            <BsInfoCircle className="text-main-500" />
                            Profile Information
                        </h3>
                        <div className="mb-1 grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-3">
                            <InfoSection label="Ranking">
                                <>
                                    {rankingPoints} pts (
                                    {numberSuffix(rankInfo?.order || 0)})
                                </>
                            </InfoSection>
                            <InfoSection label="Languages used">
                                <div className="flex gap-2">
                                    {userInfo.languages.map((lang) => (
                                        <LanguageIcon key={lang} language={lang} />
                                    ))}
                                </div>
                            </InfoSection>
                            <InfoSection label="Badges earned">
                                {badges?.length || 0} badges
                            </InfoSection>
                            <InfoSection label="Member since">
                                {getDateFormat(userInfo.createdAt)}
                            </InfoSection>
                            <InfoSection label="Challenges created">
                                {userInfo.createdExercises} challenges
                            </InfoSection>
                            <InfoSection label="Challenges solved">
                                {userInfo.solvedExercises} challenges
                            </InfoSection>
                        </div>

                        <h3 className="flex-start gap-1 mt-6 mb-1 text-2xl text-gray-700">
                            <BsTrophy className="text-main-500" /> Awarded Badges
                        </h3>
                        <Badges badges={badges || []} className="ml-1" />
                    </div>

                    {/* Action buttons for closing modal */}
                    <div className="pt-2 self-stretch flex justify-end">
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

const InfoSection: React.FC<{
    label: string | React.ReactNode;
    children: React.ReactNode;
    className?: string;
}> = ({ label, children, className = '' }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <h5 className="text-base lg:text-lg font-semibold">{label}</h5>
            <p className="text-base lg:text-lg text-gray-600">{children}</p>
        </div>
    );
};

export default UserDetailModal;
