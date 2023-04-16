import React from 'react';
import { motion } from 'framer-motion';

import { BadgeRarity } from '../../../../models/enums';

import BadgeSpecCard from './BadgeSpecCard';

const BadgeSpecs: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`grow grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-0 gap-x-3 ${className}`}>
      {BadgeSpecInfo.map((badge, idx) => (
        <motion.div
          key={badge.rarity}
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.15 }}
          viewport={{ once: true }}
        >
          <BadgeSpecCard key={badge.rarity} {...badge} />
        </motion.div>
      ))}
    </div>
  );
};

const BadgeSpecInfo = [
  {
    rarity: BadgeRarity.UR,
    description:
      'This is the badge of ultimate rarity. The UR level badges are awarded for our top users such as the one ranked 1st or those who creating/solved 30+ exercises.',
  },
  {
    rarity: BadgeRarity.SR,
    description:
      'This is the badge of super rarity. The SR level badges are typically awarded for actively engaging users such as those creating/solving 10+ exercises.',
  },
  {
    rarity: BadgeRarity.R,
    description:
      'This is the badge of rare class. The R level badges are typically awarded for users who start to make noticeable progress such as creating/solving 5+ exercises.',
  },
  {
    rarity: BadgeRarity.N,
    description:
      'This is the badge of normal rarity level. The N level badges are typically awarded for beginner achievements such as creating/solving 1+ exercises.',
  },
];

export default BadgeSpecs;
