import React from 'react';
import ForumPostsControl from './sections/ForumPostsControl';
import ForumPostsList from './sections/ForumPostsList';

/**
 Forum Sidebar for searching & sorting posts and browsing posts
 */
const ForumPostsSidebar: React.FC = () => {
    return (
        <aside className="flex flex-col min-w-[min(22.5rem,90vw)] card bg-slate-100 rounded">
            {/* Post sorting and searching */}
            <ForumPostsControl />
            {/* List of forum posts */}
            <ForumPostsList />
        </aside>
    );
};

export default ForumPostsSidebar;
