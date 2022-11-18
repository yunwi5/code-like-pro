import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { wrap } from 'popmotion';

import { mod } from '../../../utils/number';
import { AppImages } from '../../../assets/app-images';
import './Carousel.scss';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            transition: { duration: 0.3 },
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            transition: { duration: 0.3 },
        };
    },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export const Carousel: React.FC = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);

    const paginate = useCallback(
        (newDirection: number) => {
            setPage(([prevPage, _]) => [
                mod(prevPage + newDirection, images.length),
                newDirection < 0 ? -1 : 1,
            ]);
        },
        [images.length],
    );

    // Every 4s, transition to other pages automatically
    // For automatic animation effects
    useEffect(() => {
        let interval = setInterval(() => {
            // Automatically move by current direction
            paginate(direction);
        }, 4000);

        // Clear the interval before the next effect
        return () => clearInterval(interval);
    }, [direction, paginate]);

    return (
        <div className="flex-center overflow-hidden flex-col mt-5 lg:max-h-[30rem]">
            <h1 className="text-gray-600 text-xl sm:text-3xl mb-5">
                Create. Solve. Showcase.
            </h1>
            <div className="carousel flex-between gap-1 relative lg:h-[70vh] max-w-[100vw]">
                <div
                    className="carousel-nav shrink-0 hidden sm:flex flex-center z-10 !w-[3rem] !h-[3rem] text-3xl bg-gray-50 hover:bg-gray-100 shadow rounded-full cursor-pointer hover:text-main-500"
                    onClick={() => paginate(-1)}
                >
                    <BsChevronLeft />
                </div>
                <div className="h-[15rem] sm:h-[24rem] flex-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={page}
                            src={images[imageIndex]}
                            custom={direction}
                            variants={variants}
                            className="lg:h-full md:w-3/4 lg:w-full max-w-[90vw] object-cover"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                delay: 0.5,
                                x: { type: 'spring', stiffness: 300, damping: 30 },
                                opacity: { duration: 0.5 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            dragSnapToOrigin={true}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                        />
                    </AnimatePresence>
                </div>

                <div
                    className="carousel-nav shrink-0 hidden sm:flex flex-center z-10 !w-[3rem] !h-[3rem] text-3xl bg-gray-50 hover:bg-gray-100 shadow rounded-full cursor-pointer hover:text-main-500"
                    onClick={() => paginate(1)}
                >
                    <BsChevronRight />
                </div>
            </div>
            {/* Dot navigation */}
            <div className="flex gap-5 mt-4">
                {images.map((image, idx) => (
                    <span
                        key={idx}
                        onClick={() => paginate(idx - page)}
                        className={`${paginateBtnClass} ${
                            page === idx
                                ? 'bg-main-300 hover:bg-main-400'
                                : 'bg-gray-200/80 hover:bg-gray-200'
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

// Carousel images list
const images = [
    AppImages.ExerciseCreation,
    AppImages.ExerciseAttempt,
    AppImages.Showcases,
    AppImages.Ranking,
    AppImages.ExerciseBrowsing,
];

// Btn styling for pagination dot buttons
const paginateBtnClass =
    'w-4 h-4 rounded-full hover:scale-110 transition-all shadow cursor-pointer';

export default Carousel;
