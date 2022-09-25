import React from 'react';
import ForumPostsControl from './sections/ForumPostsControl';
import ForumPostsList from './sections/ForumPostsList';

const ForumPostsSidebar: React.FC = () => {
    return (
        <aside className="flex flex-col min-w-[min(22.5rem,90vw)] card bg-slate-200/80 rounded">
            <ForumPostsControl />
            <ForumPostsList />
        </aside>
    );
};

export default ForumPostsSidebar;
