'use client';
import React from 'react';
import { motion } from 'framer-motion';

import HomeBadges from '@/components/home/badges/HomeBadges';
import Comparisons from '@/components/home/comparisons/Comparisons';
import HomeFeatures from '@/components/home/features/HomeFeatures';
import HeroLanding from '@/components/home/hero-landing/HeroLanding';
import JoinUs from '@/components/home/join-us/JoinUs';
import Strengths from '@/components/home/strengths/Strengths';
import TopExercises from '@/components/home/TopExercises';
import TopUsers from '@/components/home/TopUsers';

import HomeDiscussions from './discussions/HomeDiscussions';
import ScrollProgress from './ScrollProgress';

const leftInVariants = {
  initial: { opacity: 0, x: -300 },
  animate: { opacity: 1, x: 0 },
};

const rightInVariants = {
  initial: { opacity: 0, x: 300 },
  animate: { opacity: 1, x: 0 },
};

const HomeMain = () => {
  return (
    <>
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
          className="relative z-20"
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
      <motion.div
        variants={leftInVariants}
        initial="initial"
        whileInView="animate"
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <JoinUs />
      </motion.div>
    </>
  );
};

export default HomeMain;
