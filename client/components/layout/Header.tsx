'use client';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ForumCategoryList, ProfileSectionList } from '../../models/enums';
import { useUserContext } from '../../store/context/UserContext';
import { ForumIcons } from '../../utils/forum.util';
import { getForumCategoryLink } from '../../utils/links.util';
import { ProfileLinkMap } from '../../utils/profile.util';
import HamburgerMenu from '../ui/buttons/icon-buttons/HamburgerMenu';
import AppLogo from '../ui/labels/AppLogo';
import ActiveLink from '../ui/links/ActiveLink';
import ProfileMenuHeader from '../ui/user/profile-nav/ProfileMenuHeader';
import UserProfileNav from '../ui/user/profile-nav/UserProfileNav';

function getHeaderPositionClass(pathname: string) {
  // If the route is NOT home page, sticky position to stick the header to the top when scrolled down.
  if (pathname !== '/') return '!sticky top-0';
  // If the route is home page, relative position.
  return 'relative';
}

function getHeaderPaddingClass(pathname: string) {
  // If the route is exercise attempt page, return small padding-x as it looks better on the attempt page.
  if (pathname.match(/\/exercise\/\w+$/)) return 'px-4 lg:!px-5';
  // If the route is other than the attempt page, return much larger paddings for large screen sizes.
  return 'px-4 md:px-8 lg:px-[3.5%] xl:px-[5%] 2xl:px-[6%] 3xl:px-[7%]';
}

// Mobile header breakpoint: lg - 1024px.
const Header = () => {
  const { user } = useUserContext();
  const isLoggedIn = !!user;
  const pathname = usePathname();
  const [showMobileDropdownMenu, setShowMobileDropdownMenu] = useState(false);

  const className = `${getHeaderPositionClass(pathname)} ${getHeaderPaddingClass(pathname)}`;

  return (
    <header
      id="header"
      className={`z-[90] relative flex items-center justify-between py-3 m-0 bg-white shadow ${className}`}
    >
      <div className="logo flex items-center flex-shrink-0 text-main-400">
        <HamburgerMenu visible={showMobileDropdownMenu} setVisible={setShowMobileDropdownMenu} />
        <AppLogo onClick={() => setShowMobileDropdownMenu(false)} className="text-lg xs:text-xl" />
      </div>

      {/* Navigation list: Browse, Ranking & Create shown only for a large (> 1024px) screens. */}
      <div className="hidden lg:block w-full">
        <NavList />
      </div>

      {/* Mobile dropdown menu to be displayed if the showMobileDropdownMenu state is true. */}
      <MobileDropdownMenu
        visible={showMobileDropdownMenu}
        onClose={() => setShowMobileDropdownMenu(false)}
      />

      {/* User profile info and navigation on the right side of the header. */}
      {isLoggedIn && <UserProfileNav />}
      {!isLoggedIn && <LoginButton className="text-sm sm:text-base !px-2 !py-[0.3rem] lg:hidden" />}
    </header>
  );
};

/*  Dropdown menu that is shown when the user clicks the hamburger menu on the header.
This will be hidden for the large screen size by default. */
const MobileDropdownMenu: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible, // boolean value to indicate whether to display the dropdown menu or not.
  onClose, // callback function to hide the mobile dropdown when the user clicks the link inside the nav, block
}) => {
  const isLoggedIn = !!useUserContext().user;
  const { logout } = useUserContext();

  // Determine whether to show the mobile nav or not based on the 'visible' prop.
  const visibleClass = visible ? 'visible' : '';
  return (
    <nav
      className={`mobile-nav absolute lg:hidden z-[500] w-full min-h-[85vh] top-[101%] left-0 bg-gray-100 ${visibleClass}`}
    >
      {/* Dropdown menu for nav list */}
      <div className="px-5 py-5">
        <h2 className="text-gray-700 font-bold text-lg">Menu</h2>
        <div onClick={onClose}>
          <NavList className="pl-2" />
        </div>
      </div>

      {/* Dropdown menu for profile sections */}
      {isLoggedIn && (
        <div className="px-5 pb-5">
          <h2 className="text-gray-700 font-bold text-lg">Profile</h2>

          <ProfileMenuHeader className="px-0 !pl-[0.375rem]" />
          {/* List of links to particular profile section */}
          {ProfileSectionList.map((section) => (
            <Link
              key={section}
              onClick={onClose}
              className="link-underline-effect w-fit flex-start gap-3 ml-2 my-4 whitespace-nowrap font-semibold text-gray-500 hover:text-main-600"
              href={`/profile/${ProfileLinkMap[section]}`}
            >
              {section}
            </Link>
          ))}
          {/* Logout button */}
          <div
            onClick={() => {
              logout();
              onClose();
            }}
            className="link-underline-effect w-fit flex-start gap-3 ml-2 my-4 whitespace-nowrap font-semibold text-gray-500 hover:text-main-600 cursor-pointer"
          >
            Logout
          </div>
        </div>
      )}
    </nav>
  );
};

// List of navigation links like browsing, ranking and create that are used on both mobile and desktop screen sizes.
const NavList: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { user } = useUserContext();
  const isLoggedIn = !!user;

  return (
    <nav className={`flex flex-col lg:flex-row flex-grow lg:items-center md:w-auto ${className}`}>
      <div className="text-md flex-col lg:flex-row lg:text-center md:flex-grow">
        <ActiveLink
          href="/browse"
          className="w-fit link-underline-effect mt-4 mr-8 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
          activeClassName="!text-main-500"
        >
          Challenges
        </ActiveLink>
        <ActiveLink
          href="/create-exercise"
          activeClassName="!text-main-500"
          className="w-fit link-underline-effect mt-4 mr-8 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
        >
          Create
        </ActiveLink>
        <ActiveLink
          href={'/showcase-invites'}
          activeClassName="!text-main-500"
          className="w-fit link-underline-effect mt-4 mr-8 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
        >
          Showcases
        </ActiveLink>
        <ActiveLink
          href="/ranking"
          activeClassName="!text-main-500"
          className="w-fit link-underline-effect mt-4 mr-8 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
        >
          Ranking
        </ActiveLink>
        {/* Forum nav item with some nested nav items */}
        <ForumNavItem />
      </div>
      <div className="flex flex-col lg:flex-row gap-3 max-w-[7rem] lg:max-w-none mt-4 lg:mt-0">
        {!isLoggedIn && (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        )}
      </div>
    </nav>
  );
};

const LoginButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Link
    href="/login"
    className={`flex-start gap-[0.35rem] px-3 py-[0.35rem] bg-transparent hover:bg-main-600 text-main-600 hover:text-white border border-main-500 hover:border-transparent rounded shadow-sm ${className}`}
  >
    <FiLogIn className="text-[1.1em]" />
    Login
  </Link>
);

const RegisterButton = () => (
  <Link
    href="/register"
    className="flex-start gap-[0.35rem] px-3 py-[0.35rem] bg-main-500 hover:bg-main-600 text-gray-50 font-regular border border-main-500 hover:border-transparent rounded shadow-sm"
  >
    <FaUserPlus className="text-[1.1em]" />
    Register
  </Link>
);

// Forum nav item which has a nested nav list of forum categories.
const ForumNavItem: React.FC = () => {
  return (
    <div className="nested-nav-parent w-fit mt-4 lg:mt-0 mr-10 block lg:inline-block text-gray-500 font-semibold hover:text-main-600 transition-all">
      <ActiveLink
        href="/forum"
        activeClassName="!text-main-500"
        className="link-underline-effect nested-nav-item"
      >
        Forums
      </ActiveLink>
      {/* Nested nav list of forum categories */}
      <div className="nested-nav-child !hidden lg:!block absolute top-[100%] left-0 pt-3">
        <div className="flex flex-col shadow hover:shadow-md cursor-pointer">
          {/* Link to each forum category page */}
          {ForumCategoryList.map((forum) => (
            <Link
              key={forum}
              href={getForumCategoryLink(forum)}
              className="flex-start gap-2 px-3 py-2 capitalize text-gray-500 hover:text-main-500 bg-gray-50 hover:bg-gray-100 border-b-2 border-gray-100"
            >
              <span className="text-main-600/80 hover:text-main-500">{ForumIcons[forum]}</span>{' '}
              {forum}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
