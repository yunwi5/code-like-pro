import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PacmanLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

import { getExercises } from '../../apis/exercise';
import BrowsingMain from '../../components/browsing/BrowsingMain';
import { AppProperty } from '../../constants/app';
import { IExerciseCard } from '../../models/interfaces';
import { createRandomExercises } from '../../utils/random/random-exercise';
import { toastNotify } from '../../utils/notification';
import { ToastType } from '../../models/enums';
import { mapExercisesToExerciseCards } from '../../utils/exercise-utils/exercise';

const BrowsingPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        isLoading,
        error,
        data: exercises,
    } = useQuery(['exercises'], () => getExercises().then((res) => res.data));

    if (error) {
        console.log(error);
        return <h1 className="flex-center h-[82.5vh] text-center">Something went wrong...</h1>;
    }

    // exercise cards from the server.
    const exerciseCards: IExerciseCard[] = useMemo(
        () => mapExercisesToExerciseCards(exercises || []),
        [exercises],
    );

    // Combine the exercises from the server and the random exercises generated on the client.
    // For development and testing purposes, append random exercises for a large size dataset.
    const randomExercises = useMemo(() => {
        const randomExercises = createRandomExercises(1000);
        return exerciseCards.concat(randomExercises);
    }, [exerciseCards]);

    // If there is an error from the fetching, redirect to the home page.
    useEffect(() => {
        if (!!error) {
            navigate('/');
            toastNotify('Sorry, something went wrong in browsing', ToastType.ERROR);
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
            {!isLoading && <BrowsingMain exercises={randomExercises || []} />}
        </>
    );
};

export default BrowsingPage;
