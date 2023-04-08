import React, { useEffect, useState } from 'react';
import useBrowsing from '../../hooks/useExerciseBrowsing';
import { IExerciseCard } from '../../models/interfaces';
import ExerciseList from '../ui/lists/ExerciseList';
import BrowsingHeader from './header/BrowsingHeader';
import BrowsingSidebar from './sidebar/BrowsingSidebar';

interface Props {
  exercises: IExerciseCard[];
}

const BrowsingMain: React.FC<Props> = ({ exercises }) => {
  const { exercises: processedExercises } = useBrowsing(exercises);
  // Sidebar visibility for mobile screen sizes
  const [showSidebar, setShowSidebar] = useState(false);

  // Shuffled exercises when the user clicks the shuffle button on the sidebar
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
