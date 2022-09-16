import React from 'react';
import usePagination from '../../../hooks/usePagination';
import { IExerciseWithId } from '../../../models/interfaces';
import ShowCaseInviteCard from '../../ui/cards/ShowCaseInviteCard';
import PageNavigation from '../../ui/PageNavigation';

interface Props {
    exercises: IExerciseWithId[];
    inviteMode: 'created' | 'solved';
}

// List component that renders the list of showcases
// either exercisese created by the user, or the exercises solved by the user.
const ShowCaseInviteList: React.FC<Props> = ({ exercises, inviteMode }) => {
    const {
        array: currentPageInvites,
        page,
        setPage,
        maxPage,
    } = usePagination<IExerciseWithId>({ array: exercises, itemPerPage: 5 });

    return (
        <section className="mt-2">
            <div className="flex flex-col gap-5 mb-8">
                {currentPageInvites.map((ex) => (
                    <ShowCaseInviteCard key={ex._id} exercise={ex} inviteMode={inviteMode} />
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

export default ShowCaseInviteList;
