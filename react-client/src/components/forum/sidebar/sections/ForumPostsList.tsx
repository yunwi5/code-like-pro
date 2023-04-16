import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

import useForumBrowsing from '../../../../hooks/useForumBrowsing';
import usePagination from '../../../../hooks/usePagination';
import { useAppSelector } from '../../../../store/redux/store';
import PageNavigation from '../../../ui/PageNavigation';
import ForumPostListItem from './ForumPostListItem';

const POST_PER_PAGE = 10;

/* List of forum posts on the sidebar*/
const ForumPostsList: React.FC = () => {
    const isLoading = useAppSelector((state) => state.forum.isLoading);
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
        <div className="flex flex-col lg:max-w-[23rem]">
            {/* Loading spinner while posts are loading */}
            {isLoading && (
                <div className="h-[50vh] flex-center">
                    <PuffLoader size={200} color="#5552e4" />
                </div>
            )}
            {!isLoading &&
                currentPagePosts.map((post) => (
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
