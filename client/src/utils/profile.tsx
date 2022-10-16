import { AiOutlineStar } from 'react-icons/ai';
import { FaAward, FaRegUserCircle } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { IoCreateOutline } from 'react-icons/io5';
import { BsFileEarmarkCode } from 'react-icons/bs';

import { ProfileSection } from '../models/enums';

export const ProfileLinkMap = {
    [ProfileSection.PROFILE]: '',
    [ProfileSection.STATISTICS]: 'statistics',
    [ProfileSection.FAVORITES]: 'favorites',
    [ProfileSection.MY_CREATIONS]: 'my-creations',
    [ProfileSection.MY_SUBMISSIONS]: 'my-submissions',
    [ProfileSection.BADGES]: 'badges',
};

export function getProfileSectionIcon(section: ProfileSection, className: string = '') {
    switch (section) {
        case ProfileSection.PROFILE:
            return <FaRegUserCircle className={`text-xl ${className}`} />;
        case ProfileSection.STATISTICS:
            return <GoGraph className={`text-xl ${className}`} />;
        case ProfileSection.FAVORITES:
            return <AiOutlineStar className={`text-xl ${className}`} />;
        case ProfileSection.MY_CREATIONS:
            return <IoCreateOutline className={`text-xl ${className}`} />;
        case ProfileSection.MY_SUBMISSIONS:
            return <BsFileEarmarkCode className={`text-xl ${className}`} />;
        case ProfileSection.BADGES:
            return <FaAward className={`text-xl ${className}`} />;
    }
}
