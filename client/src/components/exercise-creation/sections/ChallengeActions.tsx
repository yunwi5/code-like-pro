import React from 'react';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { IReadyStatus } from '../../../models/interfaces';
import Button from '../../ui/buttons/Button';
import RingLoader from 'react-spinners/RingLoader';

const btnClass = 'min-w-[10rem]';

const ChallengeActions: React.FC = () => {
    const {
        saveDraft,
        saveExercise,
        runCode,
        isLoading,
        createdExercise,
        redirectToCreatedExercisePage,
        readyStatus,
    } = useExerciseCreationContext();

    return (
        <div className="flex flex-col sm:flex-row lg:flex-col flex-wrap justify-between gap-2">
            {/* Safe draft to local storage only if the user did not publish the exercise yet. */}
            {!createdExercise && (
                <Button className={btnClass} onClick={saveDraft}>
                    Save Draft
                </Button>
            )}
            {isLoading ? (
                <RingLoader color="#3c38e0" size={100} className="!self-center" />
            ) : (
                <>
                    <Button className={btnClass} mode="empty" onClick={runCode}>
                        Run Code
                    </Button>
                    <Button
                        className={`${btnClass} ${
                            readyStatus?.status === 'error' ? 'btn-disabled' : ''
                        }`}
                        onClick={saveExercise}
                    >
                        Save Challenge
                    </Button>
                </>
            )}
            {!!createdExercise && (
                <Button
                    mode="empty"
                    onClick={() => redirectToCreatedExercisePage()}
                    className={btnClass}
                >
                    Published Result
                </Button>
            )}
            {!!readyStatus && <StatusMessage readyStatus={readyStatus} />}
        </div>
    );
};

// Status message display to the user.
const StatusMessage: React.FC<{ readyStatus: IReadyStatus }> = ({ readyStatus }) => {
    return (
        <p
            className={`w-full text-center ${
                readyStatus.status === 'success' ? 'text-emerald-500' : 'text-rose-500'
            }`}
        >
            {readyStatus.message}
        </p>
    );
};

export default ChallengeActions;
