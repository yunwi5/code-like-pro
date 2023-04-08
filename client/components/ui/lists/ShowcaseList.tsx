import React from 'react';
import { motion } from 'framer-motion';
import usePagination from '../../../hooks/utils/usePagination';
import { IExercise, IShowCase } from '../../../models/interfaces';
import { listItemAnimations } from '../../../utils/animations.util';
import ShowcaseCard from '../cards/ShowcaseCard';
import PageNavigation from '../PageNavigation';
import EmptyMessage from '../labels/EmptyMessage';

// Default value of exercisePerPage which is applied when the prop was not given.
const SHOWCASE_PER_PAGE = 10;

interface Props {
  showcases: IShowCase[];
  showcasesPerPage?: number;
  exercise: IExercise;
}

const ShowcaseList: React.FC<Props> = ({
  showcases,
  showcasesPerPage = SHOWCASE_PER_PAGE,
  exercise,
}) => {
  const {
    array: currentPageShowcases,
    page,
    setPage,
    maxPage,
  } = usePagination<IShowCase>({
    array: showcases,
    itemPerPage: showcasesPerPage,
  });

  const handlePage = (newPage: number) => setPage(newPage);

  return (
    <section>
      <div className="flex flex-col gap-5 mb-8">
        {currentPageShowcases.map((sc, idx) => (
          <motion.div
            key={sc._id}
            variants={listItemAnimations}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3, delay: idx * 0.07 }}
          >
            <ShowcaseCard
              key={sc._id}
              showcase={sc}
              exercise={exercise}
              className={idx % 2 === 1 ? 'bg-gray-100' : ''}
            />
          </motion.div>
        ))}

        {showcases.length === 0 && <EmptyMessage message="No showcases yet" />}
      </div>

      {/* Show page navigatio only if there are more than 1 page amount of showcases. */}
      {showcases.length >= showcasesPerPage && (
        <PageNavigation
          currentPage={page}
          totalPages={maxPage}
          onChangePage={handlePage}
        />
      )}
    </section>
  );
};

export default ShowcaseList;
