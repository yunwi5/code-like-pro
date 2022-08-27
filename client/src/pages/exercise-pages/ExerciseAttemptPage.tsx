import React from 'react';
import { Helmet } from 'react-helmet';
import ExerciseAttemptMain from '../../components/exercise-attempt/ExerciseAttemptMain';
import { AppProperty } from '../../constants/app';
import { ExerciseAttemptCtxProvider } from '../../store/context/ExerciseAttemptContext';

const ExerciseAttemptPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Challenge | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Code editor page where users can attempt the coding challenge created by other users. Users can run the code and test the code before submission.`}
                />
            </Helmet>
            <ExerciseAttemptCtxProvider exercise={null}>
                <ExerciseAttemptMain />
            </ExerciseAttemptCtxProvider>
        </>
    );
};

export default ExerciseAttemptPage;
