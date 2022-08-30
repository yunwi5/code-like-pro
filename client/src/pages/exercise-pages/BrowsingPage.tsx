import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PacmanLoader } from 'react-spinners';

import { getExercises } from '../../apis/exercise/exercise';
import BrowsingMain from '../../components/browsing/BrowsingMain';
import { Helmet } from 'react-helmet';
import { AppProperty } from '../../constants/app';
import { IExerciseCard } from '../../models/interfaces';
import { mapJobeLangCodeToAppLanguage } from '../../utils/language';
import { createRandomExercises } from '../../utils/random/random-exercise';

const BrowsingPage: React.FC = () => {
    const {
        isLoading,
        error,
        data: exercises,
    } = useQuery(['exercises'], () => getExercises().then((res) => res.data));

    if (error) {
        console.log(error);
        return <h1 className="flex-center h-[82.5vh] text-center">Something went wrong...</h1>;
    }

    const exerciseCards: IExerciseCard[] = useMemo(
        () =>
            (exercises ?? []).map((ex) => ({
                _id: ex._id,
                name: ex.name,
                topic: ex.topic,
                correctRate: 0, // for now we do not have correctness data yet
                reports: 0, // for now we do not have issue report data yet
                stars: 0,
                prompt: ex.prompt,
                language: mapJobeLangCodeToAppLanguage(ex.language), // map language code to our app language name
                difficulty: ex.difficulty,
                tags: ex.tags,
                author: ex.author,
            })),
        [exercises],
    );

    // Combine the exercises from the server and the random exercises generated on the client.
    // For development and testing purposes, append random exercises for a large size dataset.
    const randomExercises = useMemo(() => {
        const randomExercises = createRandomExercises(1000);
        return exerciseCards.concat(randomExercises);
    }, [exerciseCards]);

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
