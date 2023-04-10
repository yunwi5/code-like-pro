import React from 'react';
import ForumNav from '@/components/forum/nav/ForumNav';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[max(35rem,83.5vh)] px-3 lg:px-8 xl:px-10 2xl:px-[5%] py-10">
      <ForumNav />
      {children}
    </div>
  );
}

export default Layout;
