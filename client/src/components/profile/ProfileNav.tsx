import { getProfileSectionIcon, ProfileLinkMap } from '../../utils/profile';
import ActiveNavLink from '../ui/links/ActiveNavLink';
import { ProfileSectionList } from '../../models/enums';

const ProfileNav = () => {
    return (
        <nav className="flex flex-col sm:flex-row lg:flex-col lg:border-r-[3px] border-gray-300 text-lg">
            {ProfileSectionList.map((section) => (
                <ActiveNavLink
                    key={section}
                    className="flex-1 lg:flex-initial flex sm:justify-center md:justify-start items-center gap-3 px-3 py-2 whitespace-nowrap border-b-2 border-r-2 lg:border-r-0 last:!border-r-0 border-b-gray-200 border-r-gray-200 hover:bg-gray-200 hover:text-main-500"
                    activeClassName="text-main-500 !bg-main-100/20 border-l-[3.5px] border-main-400"
                    to={`/profile/${ProfileLinkMap[section]}`}
                >
                    {getProfileSectionIcon(section)}{' '}
                    <span className="inline sm:hidden md:inline">{section}</span>
                </ActiveNavLink>
            ))}
        </nav>
    );
};

export default ProfileNav;
