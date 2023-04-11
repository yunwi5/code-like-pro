import React from 'react';
import ForumPostsControl from './sections/ForumPostsControl';
import ForumPostsList from './sections/ForumPostsList';

const ForumPostsSidebar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <aside
      className={`relative card w-full lg:w-fit max-h-[85vh] flex flex-col min-w-[min(22.5rem,90vw)] bg-slate-100 rounded ${className}`}
    >
      <section className="sticky top-[3.5rem] h-full flex flex-col">
        <ForumPostsControl />
        <ForumPostsList />
      </section>
    </aside>
  );
};

export default ForumPostsSidebar;
