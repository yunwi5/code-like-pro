import { getProfileSectionIcon, ProfileLinkMap } from '../../utils/profile.util';
import ActiveLink from '../ui/links/ActiveLink';
import { ProfileSection, ProfileSectionList } from '../../models/enums';
import { useState } from 'react';
import HamburgerMenu from '../ui/buttons/icon-buttons/HamburgerMenu';

/* 
Profile page common section navigation.
Mobile breakpoint is sm - 640px.  
*/
const ProfileNav: React.FC<{ activeSection: ProfileSection }> = ({ activeSection }) => {
  return (
    <>
      {/* Mobile dropdown menu (only displayed < 640px) */}
      <MobileForumDropdown activeSection={activeSection} />

      {/* Tablet and desktop nav (displayed >= 640px) */}
      <nav className="sticky top-[3.75rem] hidden sm:block lg:border-r-[3px] border-gray-300 text-lg">
        <div className="sticky top-[3.75rem] flex flex-row lg:flex-col rounded-tl-md rounded-tr-md lg:rounded-tr-none overflow-hidden">
          {ProfileSectionList.map((section) => (
            <ActiveLink
              key={section}
              className="flex-1 lg:flex-initial flex sm:justify-center md:justify-start items-center gap-3 px-3 py-2 whitespace-nowrap border-b-2 border-r-2 lg:border-r-0 last:!border-r-0 border-b-gray-200 border-r-gray-200 hover:bg-gray-200 hover:text-main-500"
              activeClassName="text-main-500 !bg-main-100/20 border-l-[3.5px] border-main-400"
              to={`/profile/${ProfileLinkMap[section]}`}
            >
              {getProfileSectionIcon(section)}{' '}
              <span className="inline sm:hidden md:inline">{section}</span>
            </ActiveLink>
          ))}
        </div>
      </nav>
    </>
  );
};

// Used in mobile screen size < 640px.
const MobileForumDropdown: React.FC<{ activeSection: ProfileSection }> = ({
  activeSection,
}) => {
  // State for toggling mobile dropdown menu.
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
              to={`/profile/${ProfileLinkMap[section]}`}
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

export default ProfileNav;
