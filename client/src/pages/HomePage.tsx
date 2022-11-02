import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

import { AppProperty } from '../constants/app';
import HeroLanding from '../components/home/HeroLanding';
import TopExercises from '../components/home/TopExercises';
import TopUsers from '../components/home/TopUsers';
import Strengths from '../components/home/strengths/Strengths';
import Comparisons from '../components/home/comparisons/Comparisons';
import ScrollProgress from '../components/home/ScrollProgress';
import HomeFeatures from '../components/home/features/HomeFeatures';
import HomeDiscussions from '../components/home/discussions/HomeDiscussions';
import HomeBadges from '../components/home/badges/HomeBadges';

const leftInVariants = {
    initial: { opacity: 0, x: -300 },
    animate: { opacity: 1, x: 0 },
};

const rightInVariants = {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
};

const Home: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Home page of ${AppProperty.APP_NAME} where users can see detailed information about programming exercises on the website.`}
                />
            </Helmet>
            <ScrollProgress />

            <div className="max-w-[100vw] overflow-hidden">
                <HeroLanding />
                <motion.div
                    variants={rightInVariants}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <HomeFeatures />
                </motion.div>
                <motion.div
                    variants={leftInVariants}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Strengths />
                </motion.div>
                <motion.div
                    variants={rightInVariants}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Comparisons />
                </motion.div>
                <motion.div
                    variants={leftInVariants}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <TopExercises />
                </motion.div>
                <motion.div
                    variants={rightInVariants}
                    initial="initial"
                    whileInView="animate"
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <TopUsers />
                </motion.div>
            </div>
            <HomeBadges />
            <motion.div
                variants={rightInVariants}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <HomeDiscussions />
            </motion.div>
        </>
    );
};

export default Home;
