import React from 'react';
import usePagination from '../../../hooks/usePagination';
import { IComment } from '../../../models/interfaces';
import MainComment from '../comments/MainComment';
import PageNavigation from '../PageNavigation';

interface Props {
    comments: IComment[];
    commentPerPage?: number;
}

// Default value of exercisePerPage which is applied when the prop was not given.
const DEFAULT_PER_PAGE = 7;

const CommentList: React.FC<Props> = ({ comments, commentPerPage }) => {
    const {
        array: currentPageComments,
        page,
        setPage,
        maxPage,
    } = usePagination<IComment>({
        array: comments,
        itemPerPage: commentPerPage ?? DEFAULT_PER_PAGE,
    });

    const handlePage = (newPage: number) => setPage(newPage);

    return (
        <section className="flex flex-col">
            <div className="flex flex-col gap-8 mb-8">
                {currentPageComments.map((comment) => (
                    <MainComment key={comment._id} comment={comment} />
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

export default CommentList;
