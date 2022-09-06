import React from 'react';
import usePagination from '../../../hooks/usePagination';
import { IUserSubmissionPopulated } from '../../../models/interfaces';
import SubmissionCard from '../cards/SubmissionCard';
import PageNavigation from '../PageNavigation';

interface Props {
    submissions: IUserSubmissionPopulated[];
}

// By default, display 7 submission results in one page.
const SUBMISSION_PER_PAGE = 7;

const SubmissionList: React.FC<Props> = ({ submissions }) => {
    const {
        array: currentPageExercises,
        page,
        setPage,
        maxPage,
    } = usePagination<IUserSubmissionPopulated>({
        array: submissions,
        itemPerPage: SUBMISSION_PER_PAGE,
    });

    return (
        <section>
            <div className="flex flex-col gap-5 mb-8">
                {currentPageExercises.map((sub, idx) => (
                    <SubmissionCard
                        key={sub._id}
                        submission={sub}
                        className={idx % 2 === 1 ? 'bg-gray-100' : ''}
                    />
                ))}
            </div>

            <PageNavigation
                currentPage={page}
                totalPages={maxPage}
                onChangePage={(newPage: number) => setPage(newPage)}
            />
        </section>
    );
};

export default SubmissionList;
