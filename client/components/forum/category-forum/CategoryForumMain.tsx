import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ForumCategory, ForumCategorySection } from '../../../models/enums';
import { getForumPostCreateLink } from '../../../utils/links.util';
import ForumPostsSidebar from '../sidebar/ForumPostsSidebar';
import ForumNav from '../ForumNav';
import MobileForumSectionSelect from './MobileForumSectionSelect';

interface Props {
  category: ForumCategory;
}

/* 
Mobile layout breakpoint is lg - 1024px. 
Above 1024px, sidebar and post content are displayed side by side.
Below 1024px, only one of sidebar and post content are dipslayed.
User can select either sidebar or post content by clicking the nav button.
*/
const mobileHiddenClass = '!hidden lg:!flex';

const CategoryForumMain: React.FC<Props> = ({ category }) => {
  const postId = useParams().id;
  // Mobile selected section. In mobile, either sidebar or post content is displayed, but not both.
  const [selectedSection, setSelectedSection] = useState<ForumCategorySection>(
    postId ? ForumCategorySection.MAINCONTENT : ForumCategorySection.SIDEBAR,
  );

  useEffect(() => {
    if (postId) return setSelectedSection(ForumCategorySection.MAINCONTENT);
    setSelectedSection(ForumCategorySection.SIDEBAR);
  }, [postId]);

  return (
    <div className="min-h-[max(35rem,83.5vh)] px-3 lg:px-4 xl:px-10 2xl:px-[5%] py-10">
      <ForumNav />
      <MobileForumSectionSelect
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <main className="flex gap-5 justify-around min-h-[82.5vh]">
        {/* Sidebar */}
        <ForumPostsSidebar
          className={`${
            selectedSection !== ForumCategorySection.SIDEBAR && mobileHiddenClass
          }`}
        />

        {/* Main post content */}
        <section
          className={`card min-h-[82.5vh] flex flex-col grow bg-gray-50 ${
            selectedSection !== ForumCategorySection.MAINCONTENT && mobileHiddenClass
          }`}
        >
          {!postId && <DefaultContent category={category as ForumCategory} />}
          {/* Replace <Outlet /> with nested routes!!! */}
          {/* {postId && <Outlet />} */}
        </section>
      </main>
    </div>
  );
};

const DefaultContent: React.FC<{ category: ForumCategory }> = ({ category }) => (
  <div className="flex-1 flex-center flex-col gap-3">
    <h2 className="text-gray-600 text-2xl capitalize">Try writing your own posts!</h2>
    <Link
      href={getForumPostCreateLink(category)}
      className="btn bg-slate-200/80 hover:bg-slate-200 text-main-500 rounded !text-xl"
    >
      Make One!
    </Link>
  </div>
);

export default CategoryForumMain;
