import React from 'react';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import Button from '../../ui/buttons/Button';

const btnClass = 'min-w-[10rem]';

const ChallengeActions: React.FC = () => {
    const { saveDraft } = useExerciseCreationContext();

    return (
        <div className="flex flex-col sm:flex-row lg:flex-col flex-wrap justify-between gap-2">
            <Button className={btnClass} onClick={saveDraft}>
                Save Draft
            </Button>
            <Button className={btnClass} mode="empty">
                Run Code
            </Button>
            <Button className={btnClass}>Save Challenge</Button>
            {/* <Button className={btnClass}>See Result</Button> */}
        </div>
    );
};

export default ChallengeActions;
