import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimateSharedLayout, motion } from 'framer-motion';

import { AppImages } from '../../../assets/app-images';
import {
    getExerciseCreationPageLink,
    getShowcaseInvitesPageLink,
} from '../../../utils/links';
import FeaturesBanner from './FeaturesBanner';
import ImageBlock from './ImageBlock';
import './ImageBlock.scss';

// Image container animation for children staggering
const container = {
    show: {
        transition: {
            staggerChildren: 2,
        },
    },
};

// Side image animation
const image = {
    hidden: { opacity: 0, y: 200 },
    show: {
        opacity: 1,
        y: 0,
        transitionEnd: { opacity: 0.7 },
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            ease: 'easeInOut',
            duration: 0.8,
        },
    },
};

// Main frame image animation
const imageMain = {
    hidden: { opacity: 0, y: 200 },
    show: {
        opacity: 1,
        y: 0,
    },
};

const HomeFeatures: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="w-[min(80rem,95vw)] min-h-[90vh] mx-auto my-20 text-gray-600">
            {/* Banners for letters animations */}
            <FeaturesBanner />
            <div className="mt-5 min-h-[max(85vh,35rem)] relative">
                <AnimateSharedLayout>
                    <motion.div variants={container} animate="show">
                        {/* Top left image */}
                        <ImageBlock
                            onClick={() => navigate(getExerciseCreationPageLink())}
                            variants={image}
                            src={AppImages.ExerciseCreation}
                            alt="Exercise Creation"
                            className="top-[1rem] left-[1rem] h-[12rem] w-[calc(12rem*1.67)]"
                        />

                        {/* Bottom left image */}
                        <ImageBlock
                            onClick={() => navigate(getShowcaseInvitesPageLink())}
                            variants={image}
                            src={AppImages.Showcases}
                            alt="User Showcases"
                            className="bottom-[1rem] left-[1rem] h-[13.5rem] w-[calc(13.5rem*1.67)]"
                        />

                        {/* Top right image */}
                        <ImageBlock
                            onClick={() => navigate('/profile')}
                            variants={image}
                            src={AppImages.Statistics}
                            delay={0.5}
                            alt="Progress statistics"
                            className="top-[1rem] right-[1rem] h-[10rem] w-[20rem]"
                        />

                        {/* Bottom right image */}
                        <ImageBlock
                            onClick={() => navigate('/ranking')}
                            variants={image}
                            src={AppImages.Ranking}
                            delay={0.5}
                            alt="Global rankings"
                            className="bottom-[1rem] right-[1rem] h-[12rem] w-[calc(12*1.67)]"
                        />

                        {/* Main middle image */}
                        <ImageBlock
                            onClick={() => navigate('/browse')}
                            variants={imageMain}
                            src={AppImages.ExerciseAttempt}
                            alt="Exercise workspace"
                            className="z-[5] top-[calc(50%-9.5rem)] left-[calc(50%-17.5rem)] h-[19rem] w-[35rem] shadow-lg"
                        />
                    </motion.div>
                </AnimateSharedLayout>
            </div>
        </section>
    );
};

export default HomeFeatures;
