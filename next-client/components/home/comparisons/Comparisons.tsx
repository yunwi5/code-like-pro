import React, { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineCheck } from 'react-icons/md';
import { motion } from 'framer-motion';

import { Logo } from '../../../assets';
import useWindowSize from '../../../hooks/ui/useWindowSize';

const variants = {
  initial: {
    opacity: 0.5,
    translateY: 200,
    boxShadow: '10px 20px 20px rgba(0, 0, 0, 0.2)',
  },
  animate: {
    opacity: 1,
    translateY: 0,
    transitionEnd: { boxShadow: 'none' },
  },
};

const Comparisons: React.FC = () => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const { width } = useWindowSize();
  const enableAnimation = width > 800;

  return (
    <section className="flex flex-col gap-8 items-center py-8 md:px-10">
      <h2 className={`px-2 sm:px-10 text-center text-3xl text-gray-500 font-semibold capitalize`}>
        Nothing more than existing platform?&nbsp; No, better.
      </h2>

      {/* Grid table of comparing platforms */}
      <div className="w-[95vw] md:w-[90vw] xl:w-[75rem] overflow-x-scroll md:overflow-x-visible overflow-y-visible">
        <div className="flex flex-col text-gray-600">
          <div className="w-[max(50rem,100%)] grid grid-cols-8 md:grid-cols-9 border-b-2 border-gray-200 px-3 py-4">
            <div className="col-span-2 md:col-span-3"></div>
            {PlatformList.map((platform) => (
              <div
                key={platform}
                className="col-span-2 flex-center gap-2 text-gray-500 text-2xl font-semibold"
              >
                {platform === Platform.CODE_LIKE_PRO && <Logo size={23} />}
                {platform}
              </div>
            ))}
          </div>
          <div className="min-w-[50rem] flex flex-col" ref={scrollRef}>
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={enableAnimation ? variants : undefined}
                initial="initial"
                whileInView="animate"
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                }}
                viewport={{
                  once: true,
                  margin: `0px 0px ${100 + idx * 65.6}px 0px`,
                }}
                className="grid grid-cols-8 md:grid-cols-9 transition-all hover:bg-gray-50"
              >
                <div className="col-span-2 md:col-span-3 py-4 flex-start text-gray-500 font-semibold text-xl border-b-2 border-gray-100">
                  {feature.text}
                </div>

                {PlatformList.map((platform) => {
                  const hasFeature = feature.platforms[platform];
                  return (
                    <div
                      key={platform}
                      className="col-span-2 flex-center px-6 py-4 border-b-2 border-gray-100"
                    >
                      <div
                        className={`rounded w-full h-full flex-center py-1 ${
                          hasFeature
                            ? 'bg-emerald-50 hover:bg-emerald-100'
                            : 'bg-rose-50 hover:bg-rose-100'
                        }`}
                      >
                        {hasFeature ? (
                          <MdOutlineCheck className="text-emerald-500 text-2xl" />
                        ) : (
                          <AiOutlineClose className="text-rose-500 text-2xl" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

enum Platform {
  LEETCODE = 'LeetCode',
  CODEWARS = 'CodeWars',
  CODE_LIKE_PRO = 'CodeLikePro',
}

const PlatformList = Object.values(Platform);

const features = [
  {
    text: 'Rich code editor workspace',
    platforms: {
      [Platform.LEETCODE]: true,
      [Platform.CODEWARS]: true,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'Easy to create own exercises',
    platforms: {
      [Platform.LEETCODE]: false,
      [Platform.CODEWARS]: false,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'Detailed profile statistics',
    platforms: {
      [Platform.LEETCODE]: false,
      [Platform.CODEWARS]: false,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'Free discussion space for each exercise',
    platforms: {
      [Platform.LEETCODE]: false,
      [Platform.CODEWARS]: true,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'User solution showcasing',
    platforms: {
      [Platform.LEETCODE]: false,
      [Platform.CODEWARS]: true,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'Ranking competitions',
    platforms: {
      [Platform.LEETCODE]: true,
      [Platform.CODEWARS]: true,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'Global discussion forum',
    platforms: {
      [Platform.LEETCODE]: true,
      [Platform.CODEWARS]: false,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'All pages responsive',
    platforms: {
      [Platform.LEETCODE]: false,
      [Platform.CODEWARS]: true,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
  {
    text: 'Entirely Free',
    platforms: {
      [Platform.LEETCODE]: false,
      [Platform.CODEWARS]: true,
      [Platform.CODE_LIKE_PRO]: true,
    },
  },
];

export default Comparisons;
