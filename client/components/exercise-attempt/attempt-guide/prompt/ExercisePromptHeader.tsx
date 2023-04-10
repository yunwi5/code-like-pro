import React from 'react';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import ExerciseSpec from '../../../ui/spec/ExerciseSpec';
import PromptDifficultyLabel from './PromptDifficultyLabel';

const ExercisePromptHeader: React.FC = () => {
  const { exercise } = useExerciseAttemptCtx();
  if (exercise == null) return null;

  return (
    <header>
      <div className="flex-between">
        <h2 className="flex-start flex-wrap gap-x-3 gap-y-1 text-xl lg:text-2xl capitalize font-semibold text-gray-600">
          <span>{exercise.name}</span>
        </h2>

        <PromptDifficultyLabel exercise={exercise} />
      </div>
      <ExerciseSpec exercise={exercise} />
    </header>
  );
};

export default ExercisePromptHeader;
