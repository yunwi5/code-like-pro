import { useMemo } from 'react';
import { useAppSelector } from '../store/redux/store';
import { searchForumPosts } from '../utils/search';
import { sortForumPosts } from '../utils/sorting-utils/forum-post-sorting';

function useForumBrowsing() {
    const { sorting, searching, posts } = useAppSelector((state) => state.forum);

    // Do searching first
    const searchedPosts = useMemo(() => {
        return searchForumPosts(posts, searching).slice();
    }, [posts, searching]);

    // Do sorting posts next
    const sortedPosts = useMemo(() => {
        return sortForumPosts(searchedPosts, sorting).slice();
    }, [searchedPosts, sorting]);

    return { posts: sortedPosts };
}

export default useForumBrowsing;
