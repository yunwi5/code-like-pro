import { AiOutlineStar } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { IoCreateOutline } from 'react-icons/io5';
import { BsFileEarmarkCode } from 'react-icons/bs';

import { ProfileSection } from '../models/enums';
import { slugify } from './string-utils/url.util';

export const ProfileLinkMap = {
  [ProfileSection.MY_PROFILE]: slugify(ProfileSection.MY_PROFILE),
  [ProfileSection.STATISTICS]: slugify(ProfileSection.STATISTICS),
  [ProfileSection.FAVORITES]: slugify(ProfileSection.FAVORITES),
  [ProfileSection.MY_CREATIONS]: slugify(ProfileSection.MY_CREATIONS),
  [ProfileSection.MY_SUBMISSIONS]: slugify(ProfileSection.MY_SUBMISSIONS),
};

export function getProfileSectionIcon(section: ProfileSection, className: string = '') {
  switch (section) {
    case ProfileSection.MY_PROFILE:
      return <FaRegUserCircle className={`text-xl ${className}`} />;
    case ProfileSection.STATISTICS:
      return <GoGraph className={`text-xl ${className}`} />;
    case ProfileSection.FAVORITES:
      return <AiOutlineStar className={`text-xl ${className}`} />;
    case ProfileSection.MY_CREATIONS:
      return <IoCreateOutline className={`text-xl ${className}`} />;
    case ProfileSection.MY_SUBMISSIONS:
      return <BsFileEarmarkCode className={`text-xl ${className}`} />;
  }
}
