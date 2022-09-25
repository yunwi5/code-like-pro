import React from 'react';
import { useAppSelector } from '../../../store/redux/store';
import ForumPostsControl from './sections/ForumPostsControl';
import ForumPostsList from './sections/ForumPostsList';

const ForumPostsSidebar: React.FC = () => {
    const posts = useAppSelector((state) => state.forum.posts);

    return (
        <aside className="flex flex-col min-w-[min(22.5rem,90vw)] card bg-slate-100 rounded">
            <ForumPostsControl />
            <ForumPostsList />
        </aside>
    );
};

export default ForumPostsSidebar;
