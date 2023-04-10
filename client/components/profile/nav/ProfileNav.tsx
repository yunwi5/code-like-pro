import { getProfileSectionIcon, ProfileLinkMap } from '../../../utils/profile.util';
import ActiveLink from '../../ui/links/ActiveLink';
import { ProfileSection, ProfileSectionList } from '../../../models/enums';
import MobileProfileNavDropdown from './MobileProfileNavDropdown';

/* 
Mobile breakpoint is sm - 640px.  
*/
const ProfileNav: React.FC<{ activeSection: ProfileSection }> = ({ activeSection }) => {
  return (
    <>
      {/* Mobile dropdown menu (only displayed < 640px) */}
      <MobileProfileNavDropdown activeSection={activeSection} />

      {/* Tablet and desktop nav (displayed >= 640px) */}
      <nav className="sticky top-[3.75rem] hidden sm:block lg:border-r-[3px] border-gray-300 text-lg">
        <div className="sticky top-[3.75rem] flex flex-row lg:flex-col rounded-tl-md rounded-tr-md lg:rounded-tr-none overflow-hidden">
          {ProfileSectionList.map((section) => (
            <ActiveLink
              key={section}
              className="flex-1 lg:flex-initial flex sm:justify-center md:justify-start items-center gap-3 px-3 py-2 whitespace-nowrap border-b-2 border-r-2 lg:border-r-0 last:!border-r-0 border-b-gray-200 border-r-gray-200 hover:bg-gray-200 hover:text-main-500"
              activeClassName="text-main-500 !bg-main-100/20 border-l-[3.5px] border-main-400"
              href={`/profile/${ProfileLinkMap[section]}`}
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

export default ProfileNav;
