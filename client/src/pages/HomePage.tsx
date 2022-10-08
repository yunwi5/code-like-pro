import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { AppProperty } from '../constants/app';
import HeroLanding from '../components/home/HeroLanding';
import Carousel from '../components/home/Carousel';
import TopExercises from '../components/home/TopExercises';
import TopUsers from '../components/home/TopUsers';

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
            <div className="overflow-hidden w-100">
                <HeroLanding />
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
                    viewport={{ once: true }}
                >
                    <Carousel />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -300 }}
                    whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                    viewport={{ once: true }}
                >
                    <TopExercises />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                    viewport={{ once: true }}
                >
                    <TopUsers />
                </motion.div>
            </div>
        </>
    );
};

export default Home;
