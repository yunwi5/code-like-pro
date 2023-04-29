'use client';
import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { motion } from 'framer-motion';

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

  const {
    array: currentPagePosts,
    page,
    setPage,
    maxPage,
  } = usePagination<IForumPost>({ array: posts, itemPerPage: POST_PER_PAGE });

  const handlePage = (newPage: number) => setPage(newPage);

  return (
    <section className="mt-4 mb-2">
      <h3 className="hidden sm:block mb-5 text-gray-500 font-semibold text-lg">
        {posts.length} Post{posts.length > 0 && 's'}
      </h3>
      <div className="flex flex-col gap-5">
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
      <PageNavigation
        className="mt-6"
        currentPage={page}
        totalPages={maxPage}
        onChangePage={handlePage}
      />
    </section>
  );
};

export default ForumPostList;
