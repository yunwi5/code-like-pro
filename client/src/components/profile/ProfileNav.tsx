import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { GrFavorite } from 'react-icons/gr';
import { ProfileSection, ProfileSectionList } from '../../models/enums';
import { IoCreateOutline } from 'react-icons/io5';

import { ProfileLinkMap } from '../../utils/profile';
import ActiveNavLink from '../ui/links/ActiveNavLink';
import { BsFileEarmarkCode } from 'react-icons/bs';

function getSectionIcon(section: ProfileSection) {
    switch (section) {
        case ProfileSection.PROFILE:
            return <FaRegUserCircle className="text-xl" />;
        case ProfileSection.STATISTICS:
            return <GoGraph className="text-xl" />;
        case ProfileSection.FAVORITES:
            return <AiOutlineStar className="text-xl" />;
        case ProfileSection.MY_CREATIONS:
            return <IoCreateOutline className="text-xl" />;
        case ProfileSection.MY_SUBMISSIONS:
            return <BsFileEarmarkCode className="text-xl" />;
    }
}

const ProfileNav = () => {
    return (
        <nav className="flex flex-col border-r-[3px] border-gray-300 text-lg">
            {ProfileSectionList.map((section) => (
                <ActiveNavLink
                    key={section}
                    className="flex-start gap-3 px-3 py-2 border-b-2 border-b-gray-200 hover:bg-gray-200 hover:text-main-500"
                    activeClassName="text-main-500 !bg-main-100/20 border-l-[3.5px] border-main-400"
                    to={`/profile/${ProfileLinkMap[section]}`}
                >
                    {getSectionIcon(section)} {section}
                </ActiveNavLink>
            ))}
        </nav>
    );
};

export default ProfileNav;
