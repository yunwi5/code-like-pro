import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ForumCategory, ForumCategoryList } from '../../models/enums';
import { ForumIcons } from '../../utils/forum';
import { getForumCategoryLink } from '../../utils/links';
import HamburgerMenu from '../ui/buttons/icon-buttons/HamburgerMenu';
import ActiveNavLink from '../ui/links/ActiveNavLink';
import './ForumNav.scss';

/* Forum category section navigation. Displayed on the very top displaying different forum options as navigation buttons. */
/* Mobile breakpoint is sm - 640px */
const ForumNav: React.FC = () => {
    return (
        <nav className="forum-nav">
            {/* Mobile dropdown menu (only displayed < 640px) */}
            <MobileForumDropdown />

            <div className="hidden sm:flex flex-wrap gap-3 mb-8">
                {ForumCategoryList.map((forum) => (
                    <ActiveNavLink
                        to={getForumCategoryLink(forum)}
                        key={forum}
                        activeClassName="nav-item-active !bg-slate-600 hover:!bg-slate-700/90 text-white"
                        className="nav-item card flex-center gap-2 grow px-3 py-2 capitalize lg:text-lg bg-slate-200/90 text-gray-600 hover:!bg-slate-600 hover:text-white cursor-pointer"
                    >
                        <span className="nav-item-icon">{ForumIcons[forum]}</span>{' '}
                        <h3>{forum}</h3>
                    </ActiveNavLink>
                ))}
            </div>
        </nav>
    );
};

// Custom hook for extracting only VALID forum category from the url params.
function useCategoryParam() {
    let category = useParams().category;
    return ForumCategoryList.includes(category as any)
        ? (category as ForumCategory)
        : null;
}

// Used in mobile screen size < 640px.
const MobileForumDropdown: React.FC = () => {
    const category = useCategoryParam();
    // State for toggling mobile dropdown menu.
    const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false);

    return (
        <div className="sm:hidden grid grid-cols-3 gap-y-2 justify-items-between items-center py-2 -mt-4 mb-5 capitalize hover:bg-gray-50">
            <h3 className="text-xl pl-1 col-span-2">
                <span className="text-main-400 text-[1.2em] mr-2">
                    {category && ForumIcons[category]}
                </span>
                {category || 'Forums'}
            </h3>
            <HamburgerMenu
                className="ml-auto"
                visible={mobileDropdownVisible}
                setVisible={setMobileDropdownVisible}
            />
            {mobileDropdownVisible && (
                <ul className="col-span-3 -mb-2 flex flex-col">
                    {ForumCategoryList.map((forum) => (
                        <ActiveNavLink
                            key={forum}
                            onClick={() => setMobileDropdownVisible(false)}
                            to={getForumCategoryLink(forum)}
                            activeClassName="!bg-gray-200/70"
                            className="px-3 py-2 hover:bg-gray-100"
                        >
                            <span className="text-main-400 text-[1.2em] mr-2">
                                {ForumIcons[forum]}
                            </span>
                            {forum}
                        </ActiveNavLink>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ForumNav;
