import React from 'react';
import { ForumCategoryList } from '../../models/enums';
import { ForumIcons } from '../../utils/forum';
import { getForumNavSectionLink } from '../../utils/links';
import ActiveNavLink from '../ui/links/ActiveNavLink';
import './ForumNav.scss';

/* Forum category section navigation. Displayed on the very top displaying different forum options as navigation buttons. */
const ForumNav: React.FC = () => {
    return (
        <nav className="forum-nav flex gap-3 mb-8">
            {ForumCategoryList.map((forum) => (
                <ActiveNavLink
                    to={getForumNavSectionLink(forum)}
                    key={forum}
                    activeClassName="nav-item-active !bg-slate-600 hover:!bg-slate-700/90 text-white"
                    className="nav-item card flex-center gap-2 grow px-3 py-2 capitalize lg:text-lg bg-slate-200/90 text-gray-600 hover:!bg-slate-600 hover:text-white cursor-pointer"
                >
                    <span className="nav-item-icon">{ForumIcons[forum]}</span>{' '}
                    <h3>{forum}</h3>
                </ActiveNavLink>
            ))}
        </nav>
    );
};

export default ForumNav;
