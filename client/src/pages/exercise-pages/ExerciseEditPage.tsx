import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ExerciseCreationMain from '../../components/exercise-creation/ExerciseCreationMain';
import { AppProperty } from '../../constants/app';
import useAuth from '../../hooks/useAuth';
import { ExerciseCreationContextProvider } from '../../store/context/ExerciseCreationContext';
import { toastNotify } from '../../utils/notification';
import { ClipLoader } from 'react-spinners';
import useExerciseQuery from '../../hooks/queries/useExerciseQuery';

const ExerciseEditPage = () => {
    useAuth();
    const navigate = useNavigate();
    const exerciseId = useParams().id || '';

    // Get QueryClient from the context.
    const { exercise, error } = useExerciseQuery(exerciseId || '');
    if (error) console.log(error);

    // If there is an error while fetching the exercise data, redirect to the home page.
    useEffect(() => {
        if (!!error) {
            toastNotify(`Oops, ${(error as any)?.message}`, 'error');
            navigate('/');
        }
    }, [error]);

    return (
        <>
            <Helmet>
                <title>Edit Challenge | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Exercise edit page where users can edit a new programming challenge they created by themselves.`}
                />
            </Helmet>
            {exercise && (
                <ExerciseCreationContextProvider exercise={exercise}>
                    <ExerciseCreationMain />
                </ExerciseCreationContextProvider>
            )}
            {!exercise && (
                <div className="h-[83.5vh] flex-center">
                    <ClipLoader size={200} color="#5552e4" />
                </div>
            )}
        </>
    );
};

export default ExerciseEditPage;
