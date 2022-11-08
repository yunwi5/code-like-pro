import React from 'react';
import { BsQuestionSquare, BsTrophy } from 'react-icons/bs';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import { motion } from 'framer-motion';
import BadgeLink from './BadgeLink';

const AboutBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`pt-3 lg:pt-14 flex flex-col gap-4 text-gray-600 ${className}`}>
            {BadgeMotives.map((motive, idx) => (
                <motion.div
                    key={motive.heading}
                    initial={{ opacity: 0, x: -300 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-1 px-2 py-2"
                >
                    <h3 className="flex-start gap-2 text-gray-500 text-xl font-semibold capitalize">
                        <span className="text-[1.05em] text-main-400 hover:text-main-400 hover:scale-125 transition-all cursor-pointer">
                            {motive.icon}
                        </span>{' '}
                        {motive.heading}
                    </h3>
                    <p className="text-gray-600">{motive.paragraph}</p>
                </motion.div>
            ))}
            <BadgeLink />
        </div>
    );
};

const BadgeMotives = [
    {
        icon: <BsTrophy />,
        heading: 'Greater motivations for programming',
        paragraph:
            'Programming badges are to give greater motivations to our programming users to engage more in our programming activities.',
    },
    {
        icon: <MdOutlineCollectionsBookmark className="text-[1.135em]" />,
        heading: 'Make your collection of badges',
        paragraph:
            'You will accumulate more badges as you make more progress in creating & solving exercises and showcasing solutions.',
    },
    {
        icon: <BsQuestionSquare className="text-[1em]" />,
        heading: 'How to get more badges',
        paragraph: `You earn more as you create & solve more exercises, and showcase. The cut-score for each rarity is 1+ for N, 5+ for R, 10+ for SR, 30+ for UR.`,
    },
];

export default AboutBadges;
