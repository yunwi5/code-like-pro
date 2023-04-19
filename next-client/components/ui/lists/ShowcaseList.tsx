import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

import { featureBestItems } from '@/utils/best-featured.util';

import usePagination from '../../../hooks/utils/usePagination';
import { IExercise, IShowCase } from '../../../models/interfaces';
import { listItemAnimations } from '../../../utils/animations.util';
import ShowcaseCard from '../cards/ShowcaseCard';
import EmptyMessage from '../labels/EmptyMessage';
import PageNavigation from '../PageNavigation';

const SHOWCASE_PER_PAGE = 7;

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
  const bestFeaturedShowcases = useMemo(() => featureBestItems(showcases), [showcases]);

  const {
    array: currentPageShowcases,
    page,
    setPage,
    maxPage,
  } = usePagination({
    array: bestFeaturedShowcases,
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

      {showcases.length >= showcasesPerPage && (
        <PageNavigation currentPage={page} totalPages={maxPage} onChangePage={handlePage} />
      )}
    </section>
  );
};

export default ShowcaseList;
