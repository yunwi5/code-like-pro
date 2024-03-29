import React from 'react';
import { motion } from 'framer-motion';

import usePagination from '../../../hooks/utils/usePagination';
import { IExerciseCard } from '../../../models/interfaces';
import { listItemAnimations } from '../../../utils/animations.util';
import ExerciseCard from '../cards/ExerciseCard';
import EmptyMessage from '../labels/EmptyMessage';
import PageNavigation from '../PageNavigation';

// Default value of exercisePerPage which is applied when the prop was not given.
const EXERCISE_PER_PAGE = 10;

interface Props {
  exercises: IExerciseCard[];
  exercisePerPage?: number;
}

const ExerciseList: React.FC<Props> = ({ exercises, exercisePerPage = EXERCISE_PER_PAGE }) => {
  // custom hook for paging
  const {
    array: currentPageExercises,
    page,
    setPage,
    maxPage,
  } = usePagination<IExerciseCard>({ array: exercises, itemPerPage: exercisePerPage });

  const handlePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className="lg:basis-2/3">
      <div className="flex flex-col gap-5 mb-8">
        {currentPageExercises.map((ex, idx) => (
          <motion.div
            key={ex._id}
            variants={listItemAnimations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <ExerciseCard exercise={ex} className={idx % 2 === 1 ? 'bg-gray-100' : ''} />
          </motion.div>
        ))}

        {exercises.length === 0 && <EmptyMessage message="No challenges yet" />}
      </div>

      {exercises.length > exercisePerPage && (
        <PageNavigation currentPage={page} maxPage={maxPage} onChangePage={handlePage} />
      )}
    </section>
  );
};

export default ExerciseList;
