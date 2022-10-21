import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { BadgeSortingKey, SortingDirection } from '../../../models/enums';
import { IBadge } from '../../../models/interfaces';
import { upwardStaggeringAnimations } from '../../../utils/animations';
import { BadgeImageMap } from '../../../utils/badge';
import { getDateFormat } from '../../../utils/datetime';
import { sortBadges } from '../../../utils/sorting-utils/badge.sorting';
import BadgeSorter from '../../ui/sorting/BadgeSorter';
import BadgeDetail from './BadgeDetail';
import styles from './Badges.module.scss';

interface Props {
    heading?: string | JSX.Element; // heading title
    badges: IBadge[];
    className?: string;
}

const Badges: React.FC<Props> = ({ heading, badges, className }) => {
    const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
    const [sortingState, setSortingState] = useState({
        key: BadgeSortingKey.RARITY,
        direction: SortingDirection.DESCENDING,
    });

    const selectedBadge = badges.find((badge) => badge._id === selectedBadgeId);

    // Sort the badges whenever the sorting state changes
    const sortedBadges = useMemo(() => {
        return sortBadges(badges, sortingState).slice();
    }, [sortingState]);

    return (
        <section>
            <div className="mb-2 flex-between">
                {heading}
                <BadgeSorter
                    sortingState={sortingState}
                    setSortingState={setSortingState}
                />
            </div>
            <div className={`${styles.grid} ${className}`}>
                {sortedBadges.map((badge, idx) => (
                    <motion.div
                        key={badge._id}
                        layoutId={badge._id}
                        onClick={() => setSelectedBadgeId(badge._id)}
                        variants={upwardStaggeringAnimations}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 0.5,
                            delay: idx * 0.1,
                        }}
                    >
                        <BadgeCard
                            badge={badge}
                            className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Animated modal for a selected strength by the user */}
            <AnimatePresence>
                {selectedBadge && selectedBadgeId && (
                    <motion.div
                        layoutId={selectedBadgeId}
                        drag
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="!z-[200] fixed w-[min(26rem,95vw)] h-[min(90vh,28rem)] top-[calc(50%-(min(90vh,28rem)/2))] left-[calc(50%-(min(26rem,95vw)/2))] bg-gray-50 rounded-md"
                    >
                        <BadgeDetail
                            badge={selectedBadge}
                            open={!!selectedBadge}
                            onClose={() => setSelectedBadgeId(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal backdrop */}
            <div
                className={`fixed top-0 left-0 h-[100vh] w-[100vw] z-[95] bg-black/50 ${
                    selectedBadge ? 'block' : 'hidden'
                }`}
            ></div>
        </section>
    );
};

const BadgeCard: React.FC<{ badge: IBadge; onClick?: () => void; className: string }> = ({
    badge,
    onClick,
    className,
}) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.card} flex flex-col items-center px-2 pt-0 pb-2 rounded shadow-md hover:shadow-lg cursor-pointer ${className}`}
        >
            <img
                width="100%"
                className="h-fit"
                src={BadgeImageMap[badge.rarity]}
                alt={badge.name}
            />
            <h5 className="font-semibold text-lg text-main-400 whitespace-nowrap">
                {badge.name}
            </h5>
            <time className="font-semibold">{getDateFormat(badge.awardedAt)}</time>
            <button className="text-4xl text-main-500">{badge.rarity}</button>
        </div>
    );
};

export default Badges;
