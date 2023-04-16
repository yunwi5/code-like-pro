'use client';
import React, { FC, useEffect, useMemo, useState } from 'react';

import useExerciseShowcaseQuery from '@/hooks/showcase/exercise-showcases/useExerciseShowcaseQuery';

import useBadgeQualification from '../../../hooks/badges/useBadgeQualification';
import { SortingDirection, VotingItemSortingKey } from '../../../models/enums';
import { IShowCase } from '../../../models/interfaces';
import { useShowcaseContext } from '../../../store/context/ShowcaseContext';
import { useUserContext } from '../../../store/context/UserContext';
import { sortVotingItems } from '../../../utils/sorting-utils/voting-items.sorting';
import ShowcaseList from '../../ui/lists/ShowcaseList';
import VotingItemSorter from '../../ui/sorting/VotingItemSorter';

type ShowcaseShowcasesProps = {
  showcases: IShowCase[];
};

const ShowcaseShowcases: FC<ShowcaseShowcasesProps> = ({ showcases: initialShowcasesData }) => {
  const { userDetail } = useUserContext();
  const { exercise } = useShowcaseContext();
  const { showcases = initialShowcasesData } = useExerciseShowcaseQuery(exercise?._id ?? '');

  const { qualifyShowcaseBadges } = useBadgeQualification();

  const [sortingState, setSortingState] = useState({
    key: VotingItemSortingKey.VOTES,
    direction: SortingDirection.DESCENDING,
  });

  const sortedShowcases = useMemo(() => {
    return sortVotingItems(
      showcases,
      sortingState.key,
      sortingState.direction,
    ).slice() as IShowCase[];
  }, [sortingState, showcases]);

  const currentUserShowcase = showcases.find((sc) => sc.user._id === userDetail?._id);

  useEffect(() => {
    qualifyShowcaseBadges();
  }, [currentUserShowcase, qualifyShowcaseBadges]);

  if (!exercise) return null;

  return (
    <div className="flex flex-col px-1 md:px-4">
      <div className="flex flex-wrap flex-row justify-between items-center gap-x-3 mb-5">
        <VotingItemSorter sortingState={sortingState} setSortingState={setSortingState} />
        <h5 className="text-gray-500 font-bold text-lg">{showcases.length} Showcases</h5>
      </div>
      <ShowcaseList showcases={sortedShowcases} exercise={exercise} />
    </div>
  );
};

export default ShowcaseShowcases;
