import React from 'react';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import Tag from '../../../../ui/design-elements/Tag';

const ExercisePromptFooter = () => {
    const { exercise } = useExerciseAttemptCtx();

    if (exercise == null) return null;

    return (
        <footer className="-mt-3">
            {exercise.tags?.length > 0 && (
                <div className="flex flex-col gap-2">
                    <p>Related Tags:</p>
                    <ul className="flex gap-x-3 gap-y-2">
                        {exercise.tags.map((tag, idx) => (
                            <Tag key={idx} name={tag} />
                        ))}
                    </ul>
                </div>
            )}
        </footer>
    );
};

export default ExercisePromptFooter;
