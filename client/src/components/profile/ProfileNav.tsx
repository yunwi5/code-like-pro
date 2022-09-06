import { getProfileSectionIcon, ProfileLinkMap } from '../../utils/profile';
import ActiveNavLink from '../ui/links/ActiveNavLink';
import { ProfileSectionList } from '../../models/enums';

const ProfileNav = () => {
    return (
        <nav className="flex flex-col border-r-[3px] border-gray-300 text-lg">
            {ProfileSectionList.map((section) => (
                <ActiveNavLink
                    key={section}
                    className="flex-start gap-3 px-3 py-2 whitespace-nowrap border-b-2 border-b-gray-200 hover:bg-gray-200 hover:text-main-500"
                    activeClassName="text-main-500 !bg-main-100/20 border-l-[3.5px] border-main-400"
                    to={`/profile/${ProfileLinkMap[section]}`}
                >
                    {getProfileSectionIcon(section)} {section}
                </ActiveNavLink>
            ))}
        </nav>
    );
};

export default ProfileNav;
