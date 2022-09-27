import React from 'react';
import useForumBrowsing from '../../../../hooks/useForumBrowsing';
import usePagination from '../../../../hooks/usePagination';
import { IForumPost } from '../../../../models/interfaces';
import ForumPostCard from '../../../ui/cards/ForumPostCard';
import PageNavigation from '../../../ui/PageNavigation';

const POST_PER_PAGE = 7;

const ForumPostList: React.FC = () => {
    const { posts } = useForumBrowsing();

    // custom hook for paging
    const {
        array: currentPagePosts,
        page,
        setPage,
        maxPage,
    } = usePagination<IForumPost>({ array: posts, itemPerPage: POST_PER_PAGE });

    const handlePage = (newPage: number) => setPage(newPage);

    return (
        <section className="my-4">
            <div className="mb-5">
                <h2 className="text-gray-500 font-semibold text-base sm:text-lg">
                    {posts.length} Post{posts.length > 0 && 's'}
                </h2>
            </div>
            <div className="flex flex-col gap-5 mb-8">
                {currentPagePosts.map((post) => (
                    <ForumPostCard key={post._id} post={post} />
                ))}
            </div>
            <PageNavigation
                currentPage={page}
                totalPages={maxPage}
                onChangePage={handlePage}
            />
        </section>
    );
};

export default ForumPostList;
