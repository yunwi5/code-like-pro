import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

import BrowsingMain from '../../components/browsing/BrowsingMain';
import { AppProperty } from '../../constants/app';
import { IExerciseCard } from '../../models/interfaces';
import { toastNotify } from '../../utils/notification';
import { mapExercisesToExerciseCards } from '../../utils/exercise-utils/exercise';
import useExerciseListQuery from '../../hooks/exercise-queries/useExerciseListQuery';

const BrowsingPage: React.FC = () => {
    const navigate = useNavigate();
    const { isLoading, exercises, error } = useExerciseListQuery();

    // exercise cards from the server.
    const exerciseCards: IExerciseCard[] = useMemo(
        () => mapExercisesToExerciseCards(exercises),
        [exercises],
    );

    // If there is an error from the fetching, redirect to the home page.
    useEffect(() => {
        if (!!error) {
            navigate('/');
            toastNotify('Sorry, something went wrong in browsing', 'error');
        }
    }, [error]);

    return (
        <>
            <Helmet>
                <title>Browsing Challenge | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="Challenge browsing page where users can browse the progmmraing challenges with advanced searching, sorting and filtering functionalities."
                />
            </Helmet>

            {/* If is loading, show the loading spinner */}
            {isLoading && (
                <div className="min-h-[70vh] w-full mb-[12vh] flex-center pr-20">
                    <PacmanLoader size={100} color="#3c38e0dd" />
                </div>
            )}
            {!isLoading && <BrowsingMain exercises={exerciseCards || []} />}
        </>
    );
};

export default BrowsingPage;
