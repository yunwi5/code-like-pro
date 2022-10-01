import React from 'react';
import '../../styles/typewriter.css';

const HeroLanding: React.FC = () => {
    return (
        <div className="w-full flex-center flex-col text-center overflow-hidden h-[95vh]">
            <div className="typewriter">
                <h1 className="text-text-main-500 text-4xl p-12">
                    Programming exercises created for students by students
                </h1>
            </div>
            <h2 className="m-6 lg:text-xl ">
                A practice website for programming students where the exercises themselves
                are created by the students.
            </h2>
        </div>
    );
};

export default HeroLanding;
