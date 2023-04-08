import React from 'react';
import ForumPostList from './sections/ForumPostList';
import GlobalForumPostsControl from './sections/GlobalForumPostsControl';

const GlobalForumMain: React.FC = () => {
  return (
    <main className="card mx-auto max-w-[96vw] md:max-w-[clamp(50%,80vw,92vw)] min-h-[82.5vh] px-3 lg:px-6 xl:px-[3.5%] py-4 flex flex-col grow bg-gray-50 text-gray-700">
      <GlobalForumPostsControl />
      <ForumPostList />
    </main>
  );
};

export default GlobalForumMain;
