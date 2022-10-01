import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useExerciseTop3Query from "../../hooks/exercise-queries/useExerciseTop3Query"
import ExerciseList from "../ui/lists/ExerciseList";
import { IExerciseCard } from "../../models/interfaces";
import { mapExercisesToExerciseCards } from '../../utils/exercise-utils/exercise';

const TopExercises: React.FC = () => {
  const {exercises} = useExerciseTop3Query();
  const exerciseCards: IExerciseCard[] = useMemo(
    () => mapExercisesToExerciseCards(exercises),
    [exercises],
);
  return (
    <div className="lg:h-[80vh] sm:h-[50vh] w-full">
      <div className="lg:grid lg:grid-cols-3 h-full p-16 md:grid-cols-1">
        <div className="col-span-1 flex-center flex-col content-center lg:pl-16">
          <div>
            <h1 className="text-text-main-500 text-3xl my-2">Top Exercises</h1>
            <h2 className="lg:w-2/4 my-4 leading-7 sm:w-full">
              Browse the top rated exercises created by students tailor made for
              the courses you are taking
            </h2>
            <Link className="text-blue-500" to="/browse">
              Explore
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <div className="my-12">
            <ExerciseList exercises={exerciseCards} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TopExercises;
