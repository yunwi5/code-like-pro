import React from 'react';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { getDifficultyColorClass } from '../../../../../utils/difficulty';
import StatusLabel from '../../../../ui/labels/StatusLabel';
import ExerciseSpec from '../../../../ui/ExerciseSpec';

const ExercisePromptHeader: React.FC = () => {
    const { exercise, userSubmission } = useExerciseAttemptCtx();

    if (exercise == null) return null;

    const colorClass = getDifficultyColorClass(exercise.difficulty);

    return (
        <header>
            <div className="flex-between">
                <h2 className="flex-start flex-wrap gap-3 text-xl md:text-2xl lg:text-3xl capitalize">
                    {exercise.name}
                    {userSubmission && <StatusLabel correct={userSubmission.correct} />}
                </h2>
                <label
                    className={`px-3 py-1 text-sm md:text-base lg:text-lg xl:text-xl border-2 ${colorClass} rounded-lg`}
                >
                    {exercise.difficulty}
                </label>
            </div>
            <ExerciseSpec exercise={exercise} />
        </header>
    );
};

export default ExercisePromptHeader;
