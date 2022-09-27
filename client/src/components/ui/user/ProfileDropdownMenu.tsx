import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { ProfileSectionList } from '../../../models/enums';
import { useUserContext } from '../../../store/context/UserContext';
import { getProfileSectionIcon, ProfileLinkMap } from '../../../utils/profile';
import ProfileMenuHeader from './ProfileMenuHeader';

// Profile dropdown menu that displays user profile info and profile links.
// This component is used in UserProfileNav.tsx to display its dropdown menu.
const ProfileDropdownMenu: React.FC = () => {
    const { logout } = useUserContext();

    return (
        <nav className="z-[1000] absolute top-[102%] right-0 bg-gray-50 text-gray-700 transition-all shadow-md hover:shadow-lg rounded-sm">
            {/* Profile information */}
            <ProfileMenuHeader />
            <div>
                {/* List of links to particular profile section */}
                {ProfileSectionList.map((section) => (
                    <Link
                        key={section}
                        className="flex-start gap-3 px-4 py-2 border-t-2 whitespace-nowrap border-t-gray-200/80 hover:bg-gray-200 hover:text-main-500"
                        to={`/profile/${ProfileLinkMap[section]}`}
                    >
                        {getProfileSectionIcon(section)} {section}
                    </Link>
                ))}
                {/* Logout button */}
                <div
                    onClick={logout}
                    className="flex-start gap-3 px-4 py-2 border-t-2 whitespace-nowrap border-t-gray-200 hover:bg-gray-200 hover:text-main-500"
                >
                    <FiLogOut className="text-xl" />
                    Logout
                </div>
            </div>
        </nav>
    );
};

export default ProfileDropdownMenu;
