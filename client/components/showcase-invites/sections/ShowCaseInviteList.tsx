import React from 'react';
import { motion } from 'framer-motion';

import { isEven } from '@/utils/number.util';

import usePagination from '../../../hooks/utils/usePagination';
import { IExerciseWithId } from '../../../models/interfaces';
import { listItemAnimations } from '../../../utils/animations.util';
import ShowCaseInviteCard from '../../ui/cards/ShowCaseInviteCard';
import PageNavigation from '../../ui/PageNavigation';

interface Props {
  exercises: IExerciseWithId[];
  inviteMode: 'created' | 'solved';
}

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
              className={isEven(idx) ? 'bg-slate-100' : 'bg-slate-200'}
            />
          </motion.div>
        ))}
      </div>
      <PageNavigation
        currentPage={page}
        maxPage={maxPage}
        onChangePage={(newPage: number) => setPage(newPage)}
      />
    </section>
  );
};

export default ShowCaseInviteList;
