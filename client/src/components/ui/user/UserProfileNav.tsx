import React, { useState } from 'react';
import { useUserContext } from '../../../store/context/UserContext';
import { IoMdArrowDropdown } from 'react-icons/io';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import ProfilePicture from './ProfilePicture';
import ClickAwayListener from 'react-click-away-listener';

// Profile navigation on the header.
const UserProfileNav: React.FC = () => {
    const { user } = useUserContext();
    const [showDropdown, setShowDropdown] = useState(false);

    if (!user) return null;

    return (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <div
                onClick={() => setShowDropdown((ps) => !ps)}
                className="relative flex-center gap-2 -my-1 py-1 px-2 hover:bg-gray-200/90 focus-within:bg-gray-100 rounded-md cursor-pointer"
            >
                <ProfilePicture />
                <IoMdArrowDropdown className="text-gray-600 hover:text-main-500 text-xl" />

                {showDropdown && <ProfileDropdownMenu />}
            </div>
        </ClickAwayListener>
    );
};

export default UserProfileNav;
