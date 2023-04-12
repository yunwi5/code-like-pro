'use client';
import { useState } from 'react';

import { ProfileSection, ProfileSectionList } from '../../../models/enums';
import { getProfileSectionIcon, ProfileLinkMap } from '../../../utils/profile.util';
import HamburgerMenu from '../../ui/buttons/icon-buttons/HamburgerMenu';
import ActiveLink from '../../ui/links/ActiveLink';

// Used in mobile screen size < 640px.
const MobileProfileNavDropdown: React.FC<{ activeSection: ProfileSection }> = ({
  activeSection,
}) => {
  const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false);

  return (
    <div className="sm:hidden grid grid-cols-3 gap-y-2 justify-items-between items-center py-2 capitalize hover:bg-gray-50">
      <h3 className="flex-start gap-2 text-xl pl-3 pr-2 col-span-2">
        <span className="text-main-400 text-[1.2em]">
          {getProfileSectionIcon(activeSection, 'text-2xl')}
        </span>
        {activeSection || 'Profile'}
      </h3>
      <HamburgerMenu
        className="ml-auto"
        visible={mobileDropdownVisible}
        setVisible={setMobileDropdownVisible}
      />
      {mobileDropdownVisible && (
        <ul className="col-span-3 -mb-2 flex flex-col">
          {ProfileSectionList.map((section) => (
            <ActiveLink
              key={section}
              href={`/profile/${ProfileLinkMap[section]}`}
              onClick={() => setMobileDropdownVisible(false)}
              activeClassName="!bg-gray-200/70"
              className="flex-start gap-1 pl-4 pr-2 py-2 hover:bg-gray-100"
            >
              <span className="text-main-400 text-[1.2em] mr-2">
                {getProfileSectionIcon(section)}
              </span>
              {section}
            </ActiveLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileProfileNavDropdown;
