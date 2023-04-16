import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <div className="fixed flex-start z-[300] top-0 left-0 w-[100vw] h-[0.75rem]">
      <motion.div style={{ scaleX }} className="origin-left h-full w-full bg-main-500"></motion.div>
    </div>
  );
};

export default ScrollProgress;
