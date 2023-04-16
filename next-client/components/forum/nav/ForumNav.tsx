import React from 'react';

import { ForumCategoryList } from '../../../models/enums';
import { ForumIcons } from '../../../utils/forum.util';
import { getForumCategoryLink } from '../../../utils/links.util';
import ActiveLink from '../../ui/links/ActiveLink';

import MobileForumNavDropdown from './MobileForumNavDropdown';

import './ForumNav.scss';

/* Mobile breakpoint is sm - 640px */
const ForumNav: React.FC = () => {
  return (
    <nav className="forum-nav">
      {/* Mobile dropdown menu (only displayed < 640px) */}
      <MobileForumNavDropdown />

      <div className="hidden sm:flex flex-wrap gap-3 mb-8">
        {ForumCategoryList.map((forum) => (
          <ActiveLink
            href={getForumCategoryLink(forum)}
            key={forum}
            activeClassName="nav-item-active !bg-slate-600 hover:!bg-slate-700/90 text-white"
            className="nav-item card flex-center gap-2 grow px-3 py-2 capitalize lg:text-lg bg-slate-200/90 text-gray-600 hover:!bg-slate-600 hover:text-white cursor-pointer"
          >
            <span className="nav-item-icon">{ForumIcons[forum]}</span> <h3>{forum}</h3>
          </ActiveLink>
        ))}
      </div>
    </nav>
  );
};

export default ForumNav;
