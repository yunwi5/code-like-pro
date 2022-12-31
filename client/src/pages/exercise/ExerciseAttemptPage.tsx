import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import useAuth from '../../hooks/useAuth';
import { useUserContext } from '../../store/context/UserContext';
import { AppProperty } from '../../constants/app';
import { ExerciseAttemptCtxProvider } from '../../store/context/ExerciseAttemptContext';
import { toastNotify } from '../../utils/notification';
import ExerciseAttemptMain from '../../components/exercise-attempt/ExerciseAttemptMain';
import useExerciseQuery from '../../hooks/exercise/useExerciseQuery';

const ExerciseAttemptPage: React.FC = () => {
    useAuth();
    const { submissionMap } = useUserContext();
    const navigate = useNavigate();
    const exerciseId = useParams().id || '';

    // Custom hook for fetching exercise data.
    const {
        exercise,
        error: exerciseError,
        isLoading,
        refetch,
    } = useExerciseQuery(exerciseId);

    // Previous user submission data from the context. Either user submission or null.
    const userSubmission = useMemo(
        () =>
            submissionMap[exerciseId] && {
                ...submissionMap[exerciseId],
                exercise: exerciseId,
            },
        [submissionMap, exerciseId],
    );

    // If the exercise does not exist, or if there is an exercise error, redirect to the browsing page.
    useEffect(() => {
        if (!isLoading && !!exerciseError) {
            toastNotify('Sorry, the exercise does not exist...', 'error');
            navigate('/browse');
        }
    }, [exerciseId, exerciseError]);

    const isReady = !!exercise;

    return (
        <>
            <Helmet>
                <title>
                    Challenge {exercise?.name || ''} | {AppProperty.APP_NAME}
                </title>
                <meta
                    name="description"
                    content={`Code editor page where users can attempt the coding challenge created by other users. Users can run the code and test the code before submission.`}
                />
            </Helmet>
            {!isReady && (
                <div className="min-h-[82vh] flex-center">
                    <ClipLoader size={200} color="#3c38e0" />
                </div>
            )}
            {isReady && (
                <ExerciseAttemptCtxProvider
                    refetchExercise={refetch}
                    exercise={exercise}
                    userSubmission={userSubmission}
                >
                    <ExerciseAttemptMain />
                </ExerciseAttemptCtxProvider>
            )}
        </>
    );
};

export default ExerciseAttemptPage;
