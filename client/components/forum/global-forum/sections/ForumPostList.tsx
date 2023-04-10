'use client';
import React from 'react';
import { motion } from 'framer-motion';
import PuffLoader from 'react-spinners/PuffLoader';

import useForumBrowsing from '../../../../hooks/useForumBrowsing';
import usePagination from '../../../../hooks/utils/usePagination';
import { IForumPost } from '../../../../models/interfaces';
import { useAppSelector } from '../../../../store/redux/store';
import { listItemAnimations } from '../../../../utils/animations.util';
import ForumPostCard from '../../../ui/cards/ForumPostCard';
import PageNavigation from '../../../ui/PageNavigation';

const POST_PER_PAGE = 7;

const ForumPostList: React.FC = () => {
  const isLoading = useAppSelector((state) => state.forum.isLoading);
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
        {/* Loading spinner while posts are loading */}
        {isLoading && (
          <div className="h-[50vh] flex-center">
            <PuffLoader size={200} color="#5552e4" />
          </div>
        )}
        {currentPagePosts.map((post, idx) => (
          <motion.div
            key={post._id}
            variants={listItemAnimations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <ForumPostCard key={post._id} post={post} />
          </motion.div>
        ))}
      </div>
      <PageNavigation currentPage={page} totalPages={maxPage} onChangePage={handlePage} />
    </section>
  );
};

export default ForumPostList;
