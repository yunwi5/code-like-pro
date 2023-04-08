import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { IRankingOrder, IUserInfo } from '../../../../../../models/interfaces';
import { getDateFormat } from '../../../../../../utils/datetime.util';
import { numberSuffix } from '../../../../../../utils/number.util';
import LanguageIcon from '../../../../icons/LanguageIcon';

interface Props {
  userInfo: IUserInfo;
  rankInfo: IRankingOrder | null;
  numBadges: number;
}

const UserProfileInfo: React.FC<Props> = ({ userInfo, rankInfo, numBadges }) => {
  const rankingPoints = (rankInfo?.creationPoints || 0) + (rankInfo?.solvingPoints || 0);

  return (
    <>
      <h3 className="mb-3 flex-start gap-[0.35rem] text-2xl text-gray-700">
        <BsInfoCircle className="text-main-500" />
        Profile Information
      </h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-3">
        <InfoSection label="Ranking">
          <>
            {rankingPoints} pts ({numberSuffix(rankInfo?.order || 0)})
          </>
        </InfoSection>
        <InfoSection label="Languages used">
          <div className="flex gap-2">
            {userInfo.languages.map((lang) => (
              <LanguageIcon key={lang} language={lang} />
            ))}
          </div>
        </InfoSection>
        <InfoSection label="Badges earned">{numBadges} badges</InfoSection>
        <InfoSection label="Member since">
          {getDateFormat(userInfo.createdAt)}
        </InfoSection>
        <InfoSection label="Challenges created">
          {userInfo.createdExercises} challenges
        </InfoSection>
        <InfoSection label="Challenges solved">
          {userInfo.solvedExercises} challenges
        </InfoSection>

        {/* Show user description only if it exists */}
        {userInfo.description?.trim() && (
          <InfoSection className="sm:col-span-2 pr-3" label="About">
            {userInfo.description}
          </InfoSection>
        )}
      </div>
    </>
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

export default UserProfileInfo;
