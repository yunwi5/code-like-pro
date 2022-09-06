import React from 'react';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { IReadyStatus } from '../../../models/interfaces';
import Button from '../../ui/buttons/Button';
import RingLoader from 'react-spinners/RingLoader';
import { useNavigate } from 'react-router-dom';
import { getExerciseAttemptPageLink } from '../../../utils/links';

const btnClass = 'min-w-[10rem]';

const ChallengeActions: React.FC = () => {
    const navigate = useNavigate();
    const { saveDraft, saveExercise, runCode, isLoading, createdExercise, readyStatus } =
        useExerciseCreationContext();

    // Determine whether to show the 'published exercise result' option or not.
    // Users should create their exercise first and ready status should be 'success' to see the 'Published Result'.
    const showPublishedResult = !!createdExercise && readyStatus?.status === 'success';

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
            {showPublishedResult && (
                <Button
                    mode="empty"
                    onClick={() => navigate(getExerciseAttemptPageLink(createdExercise._id))}
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
            className={`w-full max-w-[14.5rem] text-center ${
                readyStatus.status === 'success' ? 'text-emerald-500' : 'text-rose-500'
            }`}
        >
            {readyStatus.message}
        </p>
    );
};

export default ChallengeActions;
