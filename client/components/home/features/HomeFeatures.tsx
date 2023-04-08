import React from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';

import { AppImages } from '../../../assets/app-images';
import {
  getExerciseCreationPageLink,
  getProfileLink,
  getShowcaseInvitesPageLink,
} from '../../../utils/links.util';
import FeaturesBanner from './FeaturesBanner';
import ImageBlock from './ImageBlock';
import './ImageBlock.scss';
import { ProfileSection } from '../../../models/enums';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <section className="flex-center mx-auto my-10 lg:my-20 py-4 sm:py-8 md:py-10 text-gray-600 bg-gray-100">
      <div className="w-[min(80rem,95vw)]">
        {/* Banners for letters animations */}
        <FeaturesBanner />
        <div className="relative mt-5 min-h-[30rem]">
          <AnimateSharedLayout>
            {/* Images are absolute positions for large screen sizes (1024px or above) */}
            {/* Images are in the grid layout for smaller screen sizes (<= 1023px) */}
            <motion.div
              variants={container}
              animate="show"
              className="grid grid-cols-2 gap-x-3 gap-y-6"
            >
              {/* Top left image */}
              <ImageBlock
                onClick={() => router.push(getExerciseCreationPageLink())}
                variants={image}
                src={AppImages.ExerciseCreation}
                delay={0.2}
                alt="Exercise Creation"
                className="lg:top-[1rem] lg:left-[1rem] lg:h-[12rem] lg:w-[calc(12rem*1.67)]"
              />

              {/* Bottom left image */}
              <ImageBlock
                onClick={() => router.push(getShowcaseInvitesPageLink())}
                variants={image}
                src={AppImages.Showcases}
                delay={0.35}
                alt="User Showcases"
                className="lg:bottom-[1rem] lg:left-[1rem] lg:h-[13.5rem] lg:w-[calc(13.5rem*1.67)]"
              />

              {/* Main middle image */}
              <ImageBlock
                onClick={() => router.push('/browse')}
                variants={imageMain}
                src={AppImages.ExerciseAttempt}
                alt="Exercise workspace"
                className="z-[5] col-span-2 lg:top-[calc(50%-9.5rem)] lg:left-[calc(50%-17.5rem)] lg:h-[19rem] lg:w-[35rem] shadow-lg"
              />

              {/* Top right image */}
              <ImageBlock
                onClick={() => router.push(getProfileLink(ProfileSection.STATISTICS))}
                variants={image}
                src={AppImages.Statistics}
                delay={0.35}
                alt="Progress statistics"
                className="lg:top-[1rem] lg:right-[1rem] lg:h-[10rem] lg:w-[20rem]"
              />

              {/* Bottom right image */}
              <ImageBlock
                onClick={() => router.push('/ranking')}
                variants={image}
                src={AppImages.Ranking}
                delay={0.75}
                alt="Global rankings"
                className="lg:bottom-[1rem] lg:right-[1rem] lg:h-[12rem] lg:w-[calc(12rem*1.67)]"
              />
            </motion.div>
          </AnimateSharedLayout>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
