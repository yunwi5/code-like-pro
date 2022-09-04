import React from 'react';
import usePagination from '../../hooks/usePagination';
import { IExerciseCard } from '../../models/interfaces';
import ExerciseCard from '../ui/cards/ExerciseCard';
import PageNavigation from '../ui/PageNavigation';

const EXERCISE_PER_PAGE = 10;

const ExerciseList: React.FC<{ exercises: IExerciseCard[] }> = ({ exercises }) => {
    const {
        array: currentPageExercises,
        page,
        setPage,
        maxPage,
    } = usePagination<IExerciseCard>({ array: exercises, itemPerPage: EXERCISE_PER_PAGE });

    const handlePage = (newPage: number) => setPage(newPage);

    return (
        <section className="lg:basis-2/3">
            <div className="flex flex-col gap-5 mb-8">
                {currentPageExercises.map((ex, idx) => (
                    <ExerciseCard
                        key={ex._id}
                        exercise={ex}
                        className={idx % 2 === 1 ? 'bg-gray-100' : ''}
                    />
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

export default ExerciseList;
