import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineCheck } from 'react-icons/md';

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

    return (
        <section className="flex flex-col gap-8 items-center py-8 px-10">
            <h2 className={`text-3xl text-gray-500 font-semibold capitalize`}>
                Nothing more than existing platform?&nbsp; No, better.
            </h2>
            <div className="xl:w-[75rem]">
                <div className="flex flex-col text-gray-600">
                    <div className="grid grid-cols-9 border-b-2 border-gray-200 px-3 py-4">
                        <div className="col-span-3"></div>
                        {PlatformList.map((platform) => (
                            <div
                                key={platform}
                                className="col-span-2 flex-center text-gray-500 text-2xl font-semibold"
                            >
                                {platform}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col" ref={scrollRef}>
                        {features.map((feature, idx) => (
                            <motion.div
                                variants={variants}
                                initial="initial"
                                whileInView="animate"
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5 + idx * 0.1,
                                }}
                                viewport={{
                                    once: true,
                                    margin: `0px 0px ${200 + idx * 65.6}px 0px`,
                                }}
                                className="grid grid-cols-9 transition-all hover:bg-gray-50"
                            >
                                <div className="col-span-3 py-4 flex-start text-gray-500 font-semibold text-xl border-b-2 border-gray-100">
                                    {feature.text}
                                </div>
                                {PlatformList.map((platform) => {
                                    const hasFeature = feature.platforms[platform];

                                    return (
                                        <div
                                            key={platform}
                                            className="col-span-2 px-6 py-4 border-b-2 border-gray-100"
                                        >
                                            <div
                                                className={`rounded flex-center py-1 ${
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
        text: 'Detailed profile statistics',
        platforms: {
            [Platform.LEETCODE]: false,
            [Platform.CODEWARS]: false,
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
