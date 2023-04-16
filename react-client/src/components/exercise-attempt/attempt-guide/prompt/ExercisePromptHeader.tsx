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
                <h2 className="flex-start flex-wrap gap-x-3 gap-y-1 text-xl md:text-2xl lg:text-3xl capitalize">
                    <span>{exercise.name}</span>
                </h2>

                <PromptDifficultyLabel exercise={exercise} />
            </div>
            <ExerciseSpec exercise={exercise} />
        </header>
    );
};

export default ExercisePromptHeader;
