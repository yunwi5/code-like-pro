import React from 'react';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import Button from '../../ui/buttons/Button';
import RingLoader from 'react-spinners/RingLoader';
import { Link } from 'react-router-dom';

const btnClass = 'min-w-[10rem]';

const ChallengeActions: React.FC = () => {
    const {
        saveDraft,
        saveExercise,
        isLoading,
        createdExercise,
        redirectToCreatedExercisePage,
    } = useExerciseCreationContext();

    return (
        <div className="flex flex-col sm:flex-row lg:flex-col flex-wrap justify-between gap-2">
            <Button className={btnClass} onClick={saveDraft}>
                Save Draft
            </Button>
            {isLoading ? (
                <RingLoader color="#3c38e0" size={100} className="!self-center" />
            ) : (
                <>
                    <Button className={btnClass} mode="empty">
                        Run Code
                    </Button>
                    <Button className={btnClass} onClick={saveExercise}>
                        Save Challenge
                    </Button>
                </>
            )}
            {!!createdExercise && (
                <Button onClick={() => redirectToCreatedExercisePage()} className={btnClass}>
                    Published Result
                </Button>
            )}
        </div>
    );
};

export default ChallengeActions;
