'use client';
import React, { useEffect, useMemo, useState } from 'react';

import useExerciseListQuery from '@/hooks/exercise/useExerciseListQuery';
import { mapExercisesToExerciseCards } from '@/utils/exercise-utils/exercise';

import useBrowsing from '../../hooks/useExerciseBrowsing';
import { IExerciseCard, IExerciseWithId } from '../../models/interfaces';
import ExerciseList from '../ui/lists/ExerciseList';

import BrowsingHeader from './header/BrowsingHeader';
import BrowsingSidebar from './sidebar/BrowsingSidebar';

interface Props {
  exercises: IExerciseWithId[];
}

const BrowsingMain: React.FC<Props> = ({ exercises: initialExercisesData }) => {
  const { exercises = initialExercisesData } = useExerciseListQuery();

  const exerciseCards: IExerciseCard[] = useMemo(
    () => mapExercisesToExerciseCards(exercises),
    [exercises],
  );

  const { exercises: processedExercises } = useBrowsing(exerciseCards);
  const [showSidebar, setShowSidebar] = useState(false);
  const [shuffledExercises, setShuffledExercises] = useState(processedExercises);

  const handleSuffle = (randomized: IExerciseCard[]) => setShuffledExercises(randomized);

  useEffect(() => {
    setShuffledExercises(processedExercises);
  }, [processedExercises]);

  return (
    <main className="flex flex-col gap-2 py-[2rem] lg:py-[4rem] px-4 sm:px-7 md:px-12 xl:px-[9%] min-h-[85vh]">
      <BrowsingHeader
        exercises={processedExercises}
        onToggleSidebar={() => setShowSidebar((ps) => !ps)}
      />
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <BrowsingSidebar
          className={!showSidebar ? 'hidden lg:flex' : ''}
          exercises={processedExercises}
          onShuffle={handleSuffle}
        />
        <ExerciseList exercises={shuffledExercises} />
      </div>
    </main>
  );
};

export default BrowsingMain;
