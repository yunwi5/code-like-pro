import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import useAuth from '../../hooks/useAuth';
import useExerciseQuery from '../../hooks/exercise-queries/useExerciseQuery';
import ShowcaseMain from '../../components/showcase/ShowcaseMain';
import { AppProperty } from '../../constants/app';
import { IUserSubmissionPopulated } from '../../models/interfaces';
import { ShowcaseContextProvider } from '../../store/context/ShowcaseContext';
import { useUserContext } from '../../store/context/UserContext';
import { toastNotify } from '../../utils/notification';

const ShowcasePage = () => {
    useAuth();
    const navigate = useNavigate();
    const { submissionMap } = useUserContext();
    const exerciseId = useParams().id;

    // Fetch the exercise data using React Query.
    const { exercise, isLoading, error } = useExerciseQuery(exerciseId || '');

    const userSubmission: IUserSubmissionPopulated | undefined =
        submissionMap[exerciseId || ''];

    // If the exercise does not exist or there is an error, redirect to the home page.
    useEffect(() => {
        if (!isLoading && error) {
            toastNotify(error, 'error');
            navigate('/');
        }
    }, [isLoading, error]);

    return (
        <>
            <Helmet>
                <title>ShowCase | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Showcase page of a programming exercise where users can post their code, view other users' coding solutions and discuss the efficiency."
                />
            </Helmet>

            <div className="flex-center min-h-[83vh] my-5 sm:my-10">
                {/* If there is no exercise yet, show the loading spinner. */}
                {!exercise && <ClipLoader size={200} color="#3c38e0" />}

                {/* Wrap the showcase components with the showcase context that provides all showcase data. */}
                {exercise && (
                    <ShowcaseContextProvider
                        exercise={exercise}
                        userSubmission={userSubmission}
                    >
                        <ShowcaseMain />
                    </ShowcaseContextProvider>
                )}
            </div>
        </>
    );
};

export default ShowcasePage;
