import React from 'react';
import ForumPostsControl from './sections/ForumPostsControl';
import ForumPostsList from './sections/ForumPostsList';

/**
 Forum Sidebar for searching & sorting posts and browsing posts
 */
const ForumPostsSidebar: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <aside
            className={`card w-full lg:w-fit flex flex-col min-w-[min(22.5rem,90vw)] bg-slate-100 rounded ${className}`}
        >
            {/* Post sorting and searching */}
            <ForumPostsControl />
            {/* List of forum posts */}
            <ForumPostsList />
        </aside>
    );
};

export default ForumPostsSidebar;
