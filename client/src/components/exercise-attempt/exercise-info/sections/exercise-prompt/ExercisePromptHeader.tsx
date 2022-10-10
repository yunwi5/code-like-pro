import React from 'react';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { getDifficultyColorClass } from '../../../../../utils/difficulty';
import StatusCircle from '../../../../ui/labels/StatusCircle';
import ExerciseSpec from '../../../../ui/spec/ExerciseSpec';

const ExercisePromptHeader: React.FC = () => {
    const { exercise, userSubmission } = useExerciseAttemptCtx();

    if (exercise == null) return null;

    const colorClass = getDifficultyColorClass(exercise.difficulty);

    return (
        <header>
            <div className="flex-between">
                <h2 className="flex-start flex-wrap gap-3 text-xl md:text-2xl lg:text-3xl capitalize">
                    {exercise.name}
                    {userSubmission && <StatusCircle correct={userSubmission.correct} />}
                </h2>
                <label
                    className={`px-2 py-1 text-sm md:text-base border-2 ${colorClass} rounded-lg`}
                >
                    {exercise.difficulty}
                </label>
            </div>
            <ExerciseSpec exercise={exercise} />
        </header>
    );
};

export default ExercisePromptHeader;
