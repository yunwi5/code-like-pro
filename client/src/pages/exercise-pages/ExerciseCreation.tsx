import { Helmet } from 'react-helmet';
import ExerciseCreationMain from '../../components/exercise-creation/ExerciseCreationMain';
import { AppProperty } from '../../constants/app';
import { ExerciseCreationContextProvider } from '../../store/context/ExerciseCreationContext';

const ExerciseCreation = () => {
    return (
        <>
            <Helmet>
                <title>Create Challenge | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Exercise creation page of ${AppProperty.APP_NAME} where users can create a new programming challenge in various programming languages.`}
                />
            </Helmet>
            <ExerciseCreationContextProvider>
                <ExerciseCreationMain />
            </ExerciseCreationContextProvider>
        </>
    );
};

export default ExerciseCreation;
