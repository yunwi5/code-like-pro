'use client';
import React, { useEffect, useState } from 'react';
import { ForumCategorySection } from '../../../models/enums';
import ForumPostsSidebar from '../sidebar/ForumPostsSidebar';
import MobileForumSectionSelect from './MobileForumSectionSelect';

interface Props {
  postId?: string;
  children?: React.ReactNode;
}

/* 
Mobile layout breakpoint is lg - 1024px. 
Above 1024px, sidebar and post content are displayed side by side.
Below 1024px, only one of sidebar and post content are dipslayed.
User can select either sidebar or post content by clicking the nav button.
*/
const mobileHiddenClass = '!hidden lg:!flex';

const CategoryForumPost: React.FC<Props> = ({ postId, children }) => {
  // Mobile selected section. In mobile, either sidebar or post content is displayed, but not both.
  const [selectedSection, setSelectedSection] = useState<ForumCategorySection>(
    postId ? ForumCategorySection.MAINCONTENT : ForumCategorySection.SIDEBAR,
  );

  useEffect(() => {
    if (postId) return setSelectedSection(ForumCategorySection.MAINCONTENT);
    setSelectedSection(ForumCategorySection.SIDEBAR);
  }, [postId]);

  return (
    <>
      <MobileForumSectionSelect
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <main className="flex gap-5 justify-around min-h-[82.5vh]">
        <ForumPostsSidebar
          className={`${
            selectedSection !== ForumCategorySection.SIDEBAR && mobileHiddenClass
          }`}
        />

        <section
          className={`card min-h-[82.5vh] flex flex-col grow bg-gray-50 ${
            selectedSection !== ForumCategorySection.MAINCONTENT && mobileHiddenClass
          }`}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default CategoryForumPost;
