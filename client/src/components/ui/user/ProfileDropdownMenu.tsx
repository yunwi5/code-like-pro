import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ProfileSectionList } from '../../../models/enums';
import { useUserContext } from '../../../store/context/UserContext';
import { getProfileSectionIcon, ProfileLinkMap } from '../../../utils/profile';
import ProfilePicture from './ProfilePicture';

const ProfileDropdownMenu: React.FC = () => {
    const { userDetail, logout } = useUserContext();

    return (
        <nav className="z-[1000] absolute top-[102%] right-0 bg-gray-50 text-gray-700 transition-all shadow-md hover:shadow-lg rounded-sm">
            <div className="flex items-center gap-3 px-4 py-3">
                <ProfilePicture size={'2.5rem'} />
                <div>
                    <h3 className="text-lg leading-6 mb-1">{userDetail?.name}</h3>
                    <p className="-mt-1 text-gray-400 text-sm">{userDetail?.email}</p>
                </div>
            </div>
            <div>
                {ProfileSectionList.map((section) => (
                    <Link
                        key={section}
                        className="flex-start gap-3 px-4 py-2 border-t-2 whitespace-nowrap border-t-gray-200 hover:bg-gray-200 hover:text-main-500"
                        to={`/profile/${ProfileLinkMap[section]}`}
                    >
                        {getProfileSectionIcon(section)} {section}
                    </Link>
                ))}
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
