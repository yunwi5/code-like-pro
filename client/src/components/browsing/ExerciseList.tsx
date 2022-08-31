import React, { useMemo, useState } from 'react';
import { IExerciseCard } from '../../models/interfaces';
import ExerciseCard from '../ui/cards/ExerciseCard';
import PageNavigation from '../ui/PageNavigation';

const EXERCISE_PER_PAGE = 10;

const ExerciseList: React.FC<{ exercises: IExerciseCard[] }> = ({ exercises }) => {
    // State for pagination. Pagination is index based.
    const [page, setPage] = useState(0);
    // Last page number index based.
    const maxPage = Math.floor(Math.max(exercises.length - 1, 0) / EXERCISE_PER_PAGE);

    const handlePage = (newPage: number) => setPage(newPage);

    const currentPageExercises = useMemo(() => {
        const startIndex = page * EXERCISE_PER_PAGE;
        return exercises.slice(startIndex, startIndex + EXERCISE_PER_PAGE);
    }, [page, exercises]);

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
