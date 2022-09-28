import React from "react";
import { Link } from "react-router-dom";

const TopExercises: React.FC = () => {
  return (
    <div className="h-[80vh] w-full">
      <div className="lg:grid lg:grid-cols-3 h-full p-16 md:grid-cols-1">
        <div className="col-span-1 flex-center flex-col content-center pl-16">
          <div>
            <h1 className="text-text-main-500 text-4xl my-2">Top Exercises</h1>
            <h2 className="w-2/4 my-4 leading-7">
              Browse the top rated exercises created by students tailor made for
              the courses you are taking
            </h2>
            <Link className="text-blue-500" to="/browse">
              Explore
            </Link>
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default TopExercises;
