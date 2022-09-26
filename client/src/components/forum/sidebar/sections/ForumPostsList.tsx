import React from 'react';
import useForumBrowsing from '../../../../hooks/useForumBrowsing';
import usePagination from '../../../../hooks/usePagination';
import PageNavigation from '../../../ui/PageNavigation';
import ForumPostListItem from './ForumPostListItem';

const POST_PER_PAGE = 10;

/* List of forum posts on the sidebar*/
const ForumPostsList: React.FC = () => {
    // const posts = useAppSelector((state) => state.forum.posts);
    const { posts } = useForumBrowsing();
    const {
        array: currentPagePosts,
        page,
        setPage,
        maxPage,
    } = usePagination({
        array: posts,
        itemPerPage: POST_PER_PAGE,
    });

    return (
        <div className="flex flex-col">
            {currentPagePosts.map((post) => (
                <ForumPostListItem key={post._id} post={post} />
            ))}
            <PageNavigation
                currentPage={page}
                totalPages={maxPage}
                onChangePage={setPage}
                // If the page items are too small, do not display navigation.
                className={`mt-14 ${posts.length < POST_PER_PAGE ? '!hidden' : ''}`}
            />
        </div>
    );
};

export default ForumPostsList;
