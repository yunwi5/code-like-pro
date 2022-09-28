import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { wrap } from "popmotion";
import images from "../../assets/homepage/imageData";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="flex-center overflow-hidden flex-col my-5 h-[90vh]">
      <h1 className="text-text-main-500 text-3xl mb-5">
        Create. Solve. Showcase.
      </h1>
      <div className="flex-center lg:h-[70vh]">
        <div
          className="text-3xl z-2 cursor-pointer hover:text-main-500"
          onClick={() => paginate(-1)}
        >
          <BsChevronLeft />
        </div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            className="lg:h-full lg:w-full object-cover md:h-3/4 md:w-3/4"
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              delay: 0.5,
              x: { type: "spring", stiffness: 300, damping: 30 },
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

        <div
          className="text-3xl z-2 cursor-pointer hover:text-main-500"
          onClick={() => paginate(1)}
        >
          <BsChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
