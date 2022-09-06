import React, { useEffect, useState } from 'react';
import useBrowsing from '../../hooks/useBrowsing';
import { IExerciseCard } from '../../models/interfaces';
import ExerciseList from '../ui/lists/ExerciseList';
import BrowsingSidebar from './sidebar/BrowsingSidebar';

interface Props {
    exercises: IExerciseCard[];
}

const BrowsingMain: React.FC<Props> = ({ exercises }) => {
    const { exercises: processedExercises } = useBrowsing(exercises);

    // Shuffled exercises when the user clicks the shuffle button on the sidebar
    const [shuffledExercises, setShuffledExercises] = useState(processedExercises);

    const handleSuffle = (randomized: IExerciseCard[]) => {
        setShuffledExercises(randomized);
    };

    useEffect(() => {
        setShuffledExercises(processedExercises);
    }, [processedExercises]);

    return (
        <main className="flex flex-col gap-2 py-[4rem] px-4 sm:px-7 md:px-12 xl:px-[9%] min-h-[85vh]">
            <div className="mb-2 flex flex-col sm:flex-row items-center sm:justify-between">
                <h1 className="text-gray-500 font-semibold text-xl sm:text-2xl">
                    Browsing Challenges
                </h1>
                <h3 className="text-gray-500/90 font-semibold text-base sm:text-lg translate-y-2">
                    {processedExercises.length} Challenges
                </h3>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <BrowsingSidebar exercises={processedExercises} onShuffle={handleSuffle} />
                <ExerciseList exercises={shuffledExercises} />
            </div>
        </main>
    );
};

export default BrowsingMain;
