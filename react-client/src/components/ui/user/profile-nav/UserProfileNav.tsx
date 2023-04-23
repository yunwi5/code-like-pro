import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import ProfilePicture from '../ProfilePicture';
import ClickAwayListener from 'react-click-away-listener';
import { useUserContext } from '../../../../store/context/UserContext';

// Profile navigation on the header.
const UserProfileNav: React.FC = () => {
    const { userDetail } = useUserContext();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <div
                onClick={() => setShowDropdown((ps) => !ps)}
                className="relative flex-center gap-2 -my-1 py-1 px-2 hover:bg-gray-200/90 focus-within:bg-gray-100 rounded-md cursor-pointer"
            >
                {/* User profile picture shown on the header. */}
                <ProfilePicture
                    picture={userDetail?.picture}
                    alt={userDetail?.name || 'User'}
                />

                {/* Show user name for medium to large screen sizes. */}
                <p className="hidden md:block !whitespace-nowrap">{userDetail?.name}</p>

                {/* Dropdown toggler button. */}
                <IoMdArrowDropdown className="text-gray-600 hover:text-main-500 text-xl" />

                {/* Dropdown menu that displays user profile information and profile links. */}
                <ProfileDropdownMenu visible={showDropdown} />
            </div>
        </ClickAwayListener>
    );
};

export default UserProfileNav;
