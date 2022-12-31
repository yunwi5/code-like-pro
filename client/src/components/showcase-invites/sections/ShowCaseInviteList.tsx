import React from 'react';
import { motion } from 'framer-motion';
import usePagination from '../../../hooks/usePagination';
import { IExerciseWithId } from '../../../models/interfaces';
import ShowCaseInviteCard from '../../ui/cards/ShowCaseInviteCard';
import PageNavigation from '../../ui/PageNavigation';
import { listItemAnimations } from '../../../utils/animations';

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
                {currentPageInvites.map((sc, idx) => (
                    <motion.div
                        key={sc._id}
                        variants={listItemAnimations}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                        <ShowCaseInviteCard
                            key={sc._id}
                            exercise={sc}
                            inviteMode={inviteMode}
                        />
                    </motion.div>
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
