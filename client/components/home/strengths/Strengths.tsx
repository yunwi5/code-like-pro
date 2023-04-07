import React, { useRef, useState } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaLaptopCode, FaRegChartBar, FaRegEdit } from 'react-icons/fa';
import { IoPodiumOutline } from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';

import { AppProperty } from '../../../constants';
import StrengthCard from './StrengthCard';
import Backdrop from '../../ui/modals/Backdrop';
import styles from './Strengths.module.scss';

const variants = {
  initial: {
    opacity: 0.3,
    scale: 0.75,
    translateX: 100,
    translateY: 300,
    boxShadow: '30px 30px 30px rgba(0, 0, 0, 0.3)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
    transitionEnd: { boxShadow: 'none' },
  },
};

// List of strengths
const Strengths: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Modal drag constraint (only draggable within the current section)
  const constraintRef = useRef<HTMLDivElement | null>(null);

  // Selected strength to be displayed in the layout modal.
  const selectedItem = strengthsList.find((strength) => strength.id === selectedId);

  return (
    <section
      ref={constraintRef}
      className={`${styles.grid} gap-x-[3.5rem] gap-y-[2rem] lg:gap-y-[4rem]`}
    >
      <h2 className={`${styles.heading} text-3xl text-gray-500 font-semibold capitalize`}>
        Why would you consider using {AppProperty.APP_NAME}
      </h2>

      {/* For animating the sharing layout, use AnimateSharedLayout */}
      <AnimateSharedLayout>
        {strengthsList.map((strength, idx) => (
          <motion.div
            key={strength.id}
            layoutId={strength.id}
            onClick={() => !selectedId && setSelectedId(strength.id)}
            variants={variants}
            initial="initial"
            whileInView="animate"
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
            }}
            viewport={{
              once: true,
              margin: idx > 2 ? `0px 0px 450px 0px` : `0px 0px 150px 0px`,
            }}
            className={`px-2 py-3 flex flex-col items-center gap-3 hover:bg-gray-50 cursor-pointer ${styles.strength}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <StrengthCard {...strength} />
            </div>
          </motion.div>
        ))}

        {/* Animated modal for a selected strength by the user */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              layoutId={selectedItem.id}
              drag
              dragConstraints={constraintRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed w-[min(30rem,95vw)] h-[20rem] top-[calc(50%-10rem)] left-[calc(50%-min(15rem,47.5vw))] bg-gray-50 rounded-md z-[200]"
            >
              <div
                key={selectedId}
                className="h-full z-[200] relative flex flex-col justify-center items-center gap-3 px-5 py-5"
              >
                <motion.div
                  onClick={() => setSelectedId(null)}
                  className="absolute top-3 right-3 w-[1.8rem] h-[1.8rem] flex-center rounded-full bg-main-100/80 hover:bg-main-100 cursor-pointer"
                >
                  <AiOutlineClose className="text-main-500 text-xl" />
                </motion.div>
                <StrengthCard {...selectedItem} />
              </div>
            </motion.div>
          )}
          {selectedId && <Backdrop onClose={() => setSelectedId(null)} />}
        </AnimatePresence>
      </AnimateSharedLayout>
    </section>
  );
};

const strengthsList = [
  {
    id: '1',
    heading: 'Easy to create exercises',
    content:
      'Any users can start creating their own exercises without any extra steps. Creating your own exercises will help you enhance your problem design aspects as well as testing aspects.',
    icon: <FaRegEdit />,
    link: '/create-exercise',
    linkText: 'Create exercise',
  },
  {
    id: '2',
    heading: 'Rich code editor support',
    content:
      'We provide feature-rich code editor support for all our users. It has convenient view of test cases, syntax highlighting, and autocompletions like an IDE.',
    icon: <SiVisualstudiocode />,
    link: '/browse',
    linkText: 'Find exercises',
  },
  {
    id: '3',
    heading: 'Detailed profile & statistics',
    content:
      'User profile pages support detailed statistics to let users able to track their progress of their work. They can also view their favorites, creations and submissions history.',
    icon: <FaRegChartBar />,
    link: '/profile',
    linkText: 'View stats',
  },
  {
    id: '4',
    heading: 'User showcasing',
    content:
      'For each exercise, users can showcase their solution in the user showcasing space. Users can get inspirations from clever solutions made by other users!',
    icon: <FaLaptopCode />,
    link: '/showcase-invites',
    linkText: 'View showcases',
  },
  {
    id: '5',
    heading: 'Ranking competitions',
    content:
      'To increase the competitions among the users, we have a global ranking system. Users get more ranking points as they create and solve more exercises, giving them greater motivations.',
    icon: <IoPodiumOutline />,
    link: '/ranking',
    linkText: 'View rankings',
  },
  {
    id: '6',
    heading: 'Enhanced social aspect',
    content:
      'We maximized the opportunity for users to interact each other. We have a discussion space for each exercise to discuss varioius problem solving aspects, as well as global discussion forum.',
    icon: <AiOutlineUsergroupAdd />,
    link: '/forum',
    linkText: 'View forums',
  },
];

export default Strengths;
