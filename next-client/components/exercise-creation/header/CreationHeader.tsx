import { memo } from 'react';

import { useExerciseCreationContext } from '@/store/context/ExerciseCreationContext';

import BackButton from '../../ui/buttons/BackButton';

const CreationHeader = () => {
  const { createdExercise } = useExerciseCreationContext();
  const isEditMode = !!createdExercise;

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl lg:text-3xl">
        {isEditMode ? (
          <EditChallengeMessage exerciseName={createdExercise.name} />
        ) : (
          <CreateChallengeMessage />
        )}
      </h1>
      <BackButton className="text-xl" />
    </header>
  );
};

const EditChallengeMessage = ({ exerciseName }: { exerciseName: string }) => (
  <span className="flex flex-col">
    <span>
      Edit <span className="hidden md:inline">Your</span> Challenge
    </span>
    <span className="lg:inline-block text-xl text-main-400 font-bold">{exerciseName}</span>
  </span>
);

// eslint-disable-next-line react/display-name
const CreateChallengeMessage = memo(() => (
  <span>
    Create <span className="hidden md:inline">Your Own</span> Challenge
  </span>
));

export default CreationHeader;
