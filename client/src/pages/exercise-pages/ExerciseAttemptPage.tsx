import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import useAuth from '../../hooks/useAuth';
import { useUserContext } from '../../store/context/UserContext';
import { getExerciseById } from '../../apis/exercise';
import { AppProperty } from '../../constants/app';
import { ExerciseAttemptCtxProvider } from '../../store/context/ExerciseAttemptContext';
import { toastNotify } from '../../utils/notification';
import { ToastType } from '../../models/enums';
import ExerciseAttemptMain from '../../components/exercise-attempt/ExerciseAttemptMain';

const ExerciseAttemptPage: React.FC = () => {
    useAuth();
    const { submissionMap } = useUserContext();
    const navigate = useNavigate();
    const exerciseId = useParams().id || '';

    // Get QueryClient and construct the query key.
    const queryClient = useQueryClient();
    const exerciseQueryKey = `exercise-${exerciseId}`;

    // Fetch the exercise data
    const { data: exercise, error: exerciseError } = useQuery([exerciseQueryKey], () =>
        getExerciseById(exerciseId).then((response) => response.data),
    );

    // Refetch the exercise data for an immediate update on UI.
    const refetchExercise = () => queryClient.invalidateQueries([exerciseQueryKey]);

    // Previous user submission data from the context. Either user submission or null.
    let userSubmission = submissionMap[exerciseId] && {
        ...submissionMap[exerciseId],
        exercise: exerciseId,
    };

    if (exerciseError) console.log(exerciseError);

    // If the exercise id is null, or if there is an exercise error, redirect to the browsing page.
    useEffect(() => {
        if (exerciseId == null || !!exerciseError) {
            toastNotify('Sorry, the exercise does not exist...', ToastType.ERROR);
            navigate('/browse');
        }
    }, [exerciseId, exerciseError]);

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
            {!exercise && (
                <div className="min-h-[82vh] flex-center">
                    <ClipLoader size={200} color="#3c38e0" />
                </div>
            )}
            {exercise && (
                <ExerciseAttemptCtxProvider
                    refetchExercise={refetchExercise}
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
