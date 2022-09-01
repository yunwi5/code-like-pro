import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getExerciseById } from '../../apis/exercise';
import ExerciseAttemptMain from '../../components/exercise-attempt/ExerciseAttemptMain';
import { AppProperty } from '../../constants/app';
import { IExerciseWithId } from '../../models/interfaces';
import { ExerciseAttemptCtxProvider } from '../../store/context/ExerciseAttemptContext';

const ExerciseAttemptPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const exerciseId = params.id;

    const [exercise, setExercise] = useState<IExerciseWithId | null>(null);

    useEffect(() => {
        if (exerciseId == null) return navigate('/');
        getExerciseById(exerciseId).then((res) => {
            if (res.data) setExercise(res.data);
        });
    }, [exerciseId]);

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
                <ExerciseAttemptCtxProvider exercise={exercise}>
                    <ExerciseAttemptMain />
                </ExerciseAttemptCtxProvider>
            )}
        </>
    );
};

export default ExerciseAttemptPage;
