import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import usePagination from '../../../hooks/usePagination';
import { IUserSubmissionPopulated } from '../../../models/interfaces';
import { listItemAnimations } from '../../../utils/animations';
import SubmissionCard from '../cards/SubmissionCard';
import PageNavigation from '../PageNavigation';
import EmptyMessage from '../labels/EmptyMessage';

interface Props {
    submissions: IUserSubmissionPopulated[];
}

// By default, display 7 submission results in one page.
const SUBMISSION_PER_PAGE = 7;

const SubmissionList: React.FC<Props> = ({ submissions }) => {
    const {
        array: currentPageSubmissions,
        page,
        setPage,
        maxPage,
    } = usePagination<IUserSubmissionPopulated>({
        array: submissions,
        itemPerPage: SUBMISSION_PER_PAGE,
    });

    const handlePage = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <section>
            <div className="flex flex-col gap-5 mb-8">
                <AnimatePresence>
                    {currentPageSubmissions.map((sub, idx) => (
                        <motion.div
                            key={sub._id}
                            variants={listItemAnimations}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            transition={{ duration: 0.3, delay: idx * 0.07 }}
                        >
                            <SubmissionCard
                                submission={sub}
                                className={idx % 2 === 1 ? 'bg-gray-100' : ''}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {submissions.length === 0 && (
                    <EmptyMessage message="No submissions yet" />
                )}
            </div>

            <PageNavigation
                currentPage={page}
                totalPages={maxPage}
                onChangePage={handlePage}
            />
        </section>
    );
};

export default SubmissionList;
