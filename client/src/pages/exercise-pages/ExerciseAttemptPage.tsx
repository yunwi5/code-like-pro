import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getExerciseById } from '../../apis/exercise';
import ExerciseAttemptMain from '../../components/exercise-attempt/ExerciseAttemptMain';
import { AppProperty } from '../../constants/app';
import { ExerciseAttemptCtxProvider } from '../../store/context/ExerciseAttemptContext';
import { toastNotify } from '../../utils/notification/toast';
import { ToastType } from '../../models/enums';

const ExerciseAttemptPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const exerciseId = params.id || '';

    // Get QueryClient from the context.
    const queryClient = useQueryClient();
    const exerciseQueryKey = `exercise-${exerciseId}`;

    const { data: exercise, error: exerciseError } = useQuery([exerciseQueryKey], () =>
        getExerciseById(exerciseId).then((response) => response.data),
    );

    // Need to fetch the user submission for this exercise as well.

    if (exerciseError) {
        console.log(exerciseError);
    }

    const refetchExercise = () => {
        queryClient.invalidateQueries([exerciseQueryKey]);
    };

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
                >
                    <ExerciseAttemptMain />
                </ExerciseAttemptCtxProvider>
            )}
        </>
    );
};

export default ExerciseAttemptPage;
