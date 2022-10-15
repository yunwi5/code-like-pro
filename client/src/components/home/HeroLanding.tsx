import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

import { Typewriter } from '../../models/classes/TypeWriter';
import Carousel from './carousel/Carousel';
import { sleep } from '../../utils/promise';

const HeroLanding: React.FC = () => {
    const typerRef = useRef<HTMLHeadingElement>(null);
    // State to track whether the typing animation has finished
    const [typingFinished, setTypingFinished] = useState(false);

    useEffect(() => {
        if (!typerRef.current) return;
        typerRef.current.innerText = '';
        const typeWriter = new Typewriter(typerRef.current, {
            loop: false,
            typingSpeed: 60,
        });
        typeWriter.typeString('Programming exercises created for students by students');
        typeWriter.start().then(async () => {
            // Remove the type blinking 1s after the animation finishes
            await sleep(1000);
            setTypingFinished(true);
        });
    }, []);

    return (
        <section className="min-h-[90vh] flex-center flex-col lg:flex-row gap-y-10 gap-x-3 py-5 px-4 max-w-[1600px] mx-auto">
            <div className="flex-1 flex flex-col justify-center items-center lg:items-start mt-5 lg:mt-0 text-center lg:text-left max-w-[min(80vw,70rem)] gap-6 lg:ml-5 overflow-hidden">
                <h1 className="inline-block text-2xl md:text-3xl xl:text-4xl tracking-[0.1em] capitalize bg-gradient-to-r from-main-500/90 to-fuchsia-600 bg-clip-text text-transparent">
                    <span ref={typerRef}></span>
                    {!typingFinished && (
                        <span className="blink ml-[0.15rem] h-[1.5rem] lg:h-[1.75rem]"></span>
                    )}
                </h1>
                <h2 className="text-base lg:text-xl text-gray-500">
                    A practice website for programming students where the exercises
                    themselves are created by the students.
                </h2>

                <Link
                    to={'/browse'}
                    className="btn btn-fill text-lg md:text-xl flex-center gap-2 !text-white !rounded"
                >
                    Get Started <HiOutlineArrowRight />
                </Link>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                viewport={{ once: true }}
                className="flex-1"
            >
                <Carousel />
            </motion.div>
        </section>
    );
};

export default HeroLanding;
