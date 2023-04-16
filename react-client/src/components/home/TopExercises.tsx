import React, { useMemo } from 'react';

import useExerciseTopQuery from '../../hooks/exercise/useExerciseTopQuery';
import ExerciseList from '../ui/lists/ExerciseList';
import { IExerciseCard } from '../../models/interfaces';
import { mapExercisesToExerciseCards } from '../../utils/exercise-utils/exercise';
import ArrowLink from '../ui/links/ArrowLink';

const TopExercises: React.FC = () => {
    const { exercises } = useExerciseTopQuery(3);
    const exerciseCards: IExerciseCard[] = useMemo(
        () => mapExercisesToExerciseCards(exercises),
        [exercises],
    );
    return (
        <section className="h-fit w-[clamp(20rem,85rem,97vw)] mx-auto">
            <div className="lg:grid lg:grid-cols-3 h-full py-3 lg:py-8 px-4 sm:px-10 md:grid-cols-1">
                <div className="col-span-1 flex justify-center items-start lg:items-center flex-col content-center xl:pl-16">
                    <div>
                        <h1 className="text-gray-600 text-3xl my-2">Top Exercises</h1>
                        <h2 className="lg:w-[65%] mt-4 mb-2 sm:w-full leading-7">
                            Top rated exercises created by our creative programmers who
                            are activaly participating to make our platform more
                            contentful!
                        </h2>
                        <ArrowLink to="/browse">Explore</ArrowLink>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="my-12">
                        <ExerciseList exercises={exerciseCards} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopExercises;
