import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import usePagination from '../../../hooks/usePagination';
import { IComment } from '../../../models/interfaces';
import MainComment from '../comments/MainComment';
import PageNavigation from '../PageNavigation';

interface Props {
    comments: IComment[];
    commentPerPage?: number;
    className?: string;
}

// Default value of exercisePerPage which is applied when the prop was not given.
const DEFAULT_PER_PAGE = 7;

const CommentList: FC<Props> = ({
    comments,
    commentPerPage = DEFAULT_PER_PAGE,
    className = '',
}) => {
    const {
        array: currentPageComments,
        page,
        setPage,
        maxPage,
    } = usePagination<IComment>({
        array: comments,
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
                            transition={{ duration: 0.2 }}
                            exit={{ opacity: 0, x: 300 }}
                            key={comment._id}
                        >
                            <MainComment comment={comment} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <PageNavigation
                className={`mt-auto`}
                currentPage={page}
                totalPages={maxPage}
                onChangePage={handlePage}
            />
        </section>
    );
};

export default CommentList;
