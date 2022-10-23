import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { AppProperty } from '../../constants/app';
import useAuth from '../../hooks/useAuth';
import useExerciseListQuery from '../../hooks/exercise-queries/useExerciseListQuery';
import { useUserContext } from '../../store/context/UserContext';
import { toastNotify } from '../../utils/notification';
import ShowCaseInvites from '../../components/showcase-invites/ShowCaseInvites';

const ShowcaseInvitesPage: React.FC = () => {
    useAuth();
    const navigate = useNavigate();
    const { userDetail, submissionMap } = useUserContext();

    const { isLoading, exercises, error } = useExerciseListQuery();

    // If there is an error from the fetching, redirect to the 5home page.
    useEffect(() => {
        if (!isLoading && !!error) {
            navigate('/');
            toastNotify(
                'Sorry, something went wrong in fetching exercise data...',
                'error',
            );
        }
    }, [error]);

    // List of exercises created by the user.
    const createdExercises = userDetail?.exercises || [];
    // List of exercises solved by the user.
    const solvedExercises = exercises.filter((ex) => submissionMap[ex._id]?.correct);

    return (
        <>
            <Helmet>
                <title>Showcases | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="List of coding exercise showcase forums where users can join in and participate in showcasing solutions and discussions."
                />
            </Helmet>
            <div className="flex-center min-h-[83vh]">
                <ShowCaseInvites
                    createdExercises={createdExercises}
                    solvedExercises={solvedExercises}
                />
            </div>
        </>
    );
};

export default ShowcaseInvitesPage;
