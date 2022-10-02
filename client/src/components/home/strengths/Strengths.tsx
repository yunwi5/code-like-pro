import React, { useState } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaLaptopCode, FaRegChartBar, FaRegEdit } from 'react-icons/fa';
import { IoPodiumOutline } from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';

import { AppProperty } from '../../../constants/app';
import styles from './Strengths.module.scss';
import StrengthCard from './StrengthCard';
import Backdrop from '../../ui/modals/Backdrop';

const variants = {
    initial: {
        opacity: 0.5,
        // scale: 0.75,
        translateX: 100,
        translateY: 300,
        boxShadow: '30px 30px 30px rgba(0, 0, 0, 0.3)',
    },
    animate: {
        opacity: 1,
        // scale: 1,
        translateX: 0,
        translateY: 0,
        transitionEnd: { boxShadow: 'none' },
    },
};

const Strengths: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedItem = strengthsList.find((strength) => strength.id === selectedId);

    return (
        <section className={styles.grid}>
            <h2
                className={`${styles.heading} text-3xl text-gray-500 font-semibold capitalize`}
            >
                Why would you consider using {AppProperty.APP_NAME}
            </h2>

            <AnimateSharedLayout>
                {strengthsList.map((strength, idx) => (
                    <motion.div
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
                            margin: idx > 2 ? `0px 0px 300px 0px` : undefined,
                        }}
                        className={`px-2 py-3 flex flex-col items-center gap-3 hover:bg-gray-50 cursor-pointer ${styles.strength}`}
                    >
                        <div className="flex flex-col gap-3 items-center">
                            <StrengthCard key={idx} {...strength} />
                        </div>
                    </motion.div>
                ))}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            layoutId={selectedItem.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed w-[30rem] h-[17rem] top-[calc(50%-8.5rem)] left-[calc(50%-15rem)] bg-gray-50 rounded-md z-[200]"
                        >
                            <div
                                key={selectedId}
                                className="z-[200] relative flex flex-col gap-3 items-center px-5 py-5"
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
                    {selectedId && <Backdrop onClose={() => {}} />}
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
            'Any users can start creating their own exercises without any extra steps. Creating your own exercises will help you enhance your problem design aspect as well as testing aspects.',
        icon: <FaRegEdit />,
        link: '/create-exercise',
    },
    {
        id: '2',
        heading: 'Rich code editor support',
        content:
            'We provide feature-rich code editor support for all our users. It has convenient view of test cases, syntax highlighting, and autocompletions like an IDE.',
        icon: <SiVisualstudiocode />,
        link: '/browse',
    },
    {
        id: '3',
        heading: 'Detailed profile & statistics',
        content:
            'We provide feature-rich code editor support for all our users. It has convenient view of test cases, syntax highlighting, and autocompletions like an IDE.',
        icon: <FaRegChartBar />,
        link: '/profile',
    },
    {
        id: '4',
        heading: 'User showcasing',
        content:
            'We provide feature-rich code editor support for all our users. It has convenient view of test cases, syntax highlighting, and autocompletions like an IDE.',
        icon: <FaLaptopCode />,
        link: '/showcase-invites',
    },
    {
        id: '5',
        heading: 'Ranking competitions',
        content:
            'We provide feature-rich code editor support for all our users. It has convenient view of test cases, syntax highlighting, and autocompletions like an IDE.',
        icon: <IoPodiumOutline />,
        link: '/ranking',
    },
    {
        id: '6',
        heading: 'Enhanced social aspect',
        content:
            'We provide feature-rich code editor support for all our users. It has convenient view of test cases, syntax highlighting, and autocompletions like an IDE.',
        icon: <AiOutlineUsergroupAdd />,
        link: '/forum',
    },
];

export default Strengths;
