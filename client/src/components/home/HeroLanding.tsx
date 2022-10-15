import React, { useEffect, useRef } from 'react';
import { Typewriter } from '../../models/classes/TypeWriter';
import '../../styles/typewriter.scss';

const HeroLanding: React.FC = () => {
    // const typerRef = useRef<HTMLHeadingElement>(null);

    // useEffect(() => {
    //     if (!typerRef.current) return;
    //     const typeWriter = new Typewriter(typerRef.current, {
    //         loop: false,
    //         typingSpeed: 60,
    //     });
    //     typeWriter.typeString('Programming exercises created for students by students');
    //     typeWriter.start();
    // }, []);

    return (
        <div className="w-full flex-center flex-col text-center overflow-hidden h-[95vh]">
            <div className="typewriter">
                {/* <h1 className="text-5xl" ref={typerRef}></h1> */}
                <h1 className="text-4xl">
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
