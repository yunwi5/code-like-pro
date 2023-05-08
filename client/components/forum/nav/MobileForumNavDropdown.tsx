'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

import { ForumCategory, ForumCategoryList } from '../../../models/enums';
import { ForumIcons } from '../../../utils/forum.util';
import { getForumCategoryLink } from '../../../utils/links.util';
import HamburgerMenu from '../../ui/buttons/icon-buttons/HamburgerMenu';
import ActiveLink from '../../ui/links/ActiveLink';

function useCategoryParam() {
  const category = useParams().category;
  return ForumCategoryList.includes(category as any) ? (category as ForumCategory) : null;
}

// Used in mobile screen size < 640px.
const MobileForumNavDropdown: React.FC = () => {
  const category = useCategoryParam();
  const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false);

  return (
    <div className="sm:hidden grid grid-cols-3 gap-y-2 justify-items-between items-center py-3 -mt-4 capitalize hover:bg-gray-50">
      <h3 className="text-xl pl-1 col-span-2">
        <span className="text-main-400 text-[1.2em] mr-2">{category && ForumIcons[category]}</span>
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
            <ActiveLink
              key={forum}
              onClick={() => setMobileDropdownVisible(false)}
              href={getForumCategoryLink(forum)}
              activeClassName="!bg-gray-200/70"
              className="px-3 py-2 hover:bg-gray-100"
            >
              <span className="text-main-400 text-[1.2em] mr-2">{ForumIcons[forum]}</span>
              {forum}
            </ActiveLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileForumNavDropdown;
