import React from 'react';
import { motion } from 'framer-motion';

import { ForumCategoryList } from '../../../models/enums';
import Button from '../../ui/buttons/Button';
import ForumCard from './ForumCard';
import styles from './HomeDiscussions.module.scss';
import Link from 'next/link';

const HomeDiscussions: React.FC = () => {
  return (
    <section className="mt-16 flex flex-col items-center gap-6 px-4 pt-14 pb-12 bg-gray-100">
      <h2 className={`text-3xl text-center text-gray-500 font-semibold capitalize`}>
        Global discussion space across 7 categories
      </h2>
      <p className="text-gray-600 max-w-[80%] md:max-w-[50%] text-center">
        We provide free discussion space where users can make posts about programming &
        tech related topics, and other users can like or add comments.
      </p>
      <div className={styles.grid}>
        {ForumCategoryList.map((forum, idx) => (
          <motion.div
            initial={{
              opacity: 0.3,
              scale: 1.2,
              y: 350,
              boxShadow: '30px 50px 30px rgba(0, 0, 0, 0.3)',
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              transitionEnd: {
                boxShadow: 'none',
              },
              transition: { duration: 0.5, delay: idx * 0.1 },
            }}
            viewport={{
              once: true,
              margin: getMarginByIndex(idx),
            }}
            key={forum}
          >
            <ForumCard forum={forum} />
          </motion.div>
        ))}
      </div>
      <Link href="/forum" className="mt-5">
        <Button>Explore Forums</Button>
      </Link>
    </section>
  );
};

// Give different margin to the scroll effect based on the cards placement.
function getMarginByIndex(idx: number) {
  if (idx <= 2) return '0px 0px 150px 0px';
  if (idx <= 5) return '0px 0px 350px 0px';
  return '0px 0px 550px 0px';
}

export default HomeDiscussions;
