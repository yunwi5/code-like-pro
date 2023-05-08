import { FC, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { featureBestItems } from '@/utils/best-featured.util';

import usePagination from '../../../hooks/utils/usePagination';
import { IComment } from '../../../models/interfaces';
import MainComment from '../comments/MainComment';
import EmptyMessage from '../labels/EmptyMessage';
import PageNavigation from '../PageNavigation';

interface Props {
  comments: IComment[];
  onUpdateComment: (id: string, updateProp: { text: string }) => void;
  onDeleteComment: (id: string) => void;
  commentPerPage?: number;
  className?: string;
}

// Default value of exercisePerPage which is applied when the prop was not given.
const DEFAULT_PER_PAGE = 7;

const CommentList: FC<Props> = ({
  comments,
  onUpdateComment,
  onDeleteComment,
  commentPerPage = DEFAULT_PER_PAGE,
  className = '',
}) => {
  const bestFeaturedComments = useMemo(() => featureBestItems(comments, 3), [comments]);

  const {
    array: currentPageComments,
    page,
    setPage,
    maxPage,
  } = usePagination({
    array: bestFeaturedComments,
    itemPerPage: commentPerPage,
  });

  const handlePage = (newPage: number) => setPage(newPage);

  return (
    <section className={`flex-1 flex flex-col ${className}`}>
      <div className="flex flex-col gap-8 mb-8">
        <AnimatePresence>
          {currentPageComments.map((comment) => (
            // Animate delete action that removes the comment from the DOM
            <motion.div
              key={comment._id}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, x: 300 }}
            >
              <MainComment
                comment={comment}
                onUpdate={onUpdateComment}
                onDelete={onDeleteComment}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && <EmptyMessage className="!mt-8 mb-4" message="No comments yet" />}
      </div>
      <PageNavigation
        className={`mt-auto`}
        currentPage={page}
        maxPage={maxPage}
        onChangePage={handlePage}
      />
    </section>
  );
};

export default CommentList;
