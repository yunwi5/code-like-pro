import React, { useMemo } from 'react';
import { IExerciseCard, IExerciseWithId } from '../../models/interfaces';
import { mapJobeLangCodeToAppLanguage } from '../../utils/language';
import { createRandomExercises } from '../../utils/random/random-exercise';
import ExerciseList from './list/ExerciseList';
import BrowsingSidebar from './sidebar/BrowsingSidebar';

interface Props {
    exercises: IExerciseWithId[];
}

const BrowsingMain: React.FC<Props> = ({ exercises }) => {
    const exerciseCards: IExerciseCard[] = useMemo(
        () =>
            exercises.map((ex) => ({
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
        [],
    );

    // Combine the exercises from the server and the random exercises generated on the client.
    const randomExercises = useMemo(() => {
        const randomExercises = createRandomExercises(1000);
        return exerciseCards.concat(randomExercises);
    }, [exerciseCards]);

    return (
        <main className="flex flex-col gap-2 pt-[4rem] px-7 md:px-12 xl:px-[9%] py-8 min-h-[85vh]">
            <div className="flex-between">
                <h1 className="text-gray-500 font-semibold text-2xl">Browsing Challenges</h1>
                <h3 className="text-gray-500/90 font-semibold text-lg text-right">
                    {randomExercises.length} Challenges Found
                </h3>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <BrowsingSidebar />
                <ExerciseList exercises={randomExercises} />
            </div>
        </main>
    );
};

export default BrowsingMain;
