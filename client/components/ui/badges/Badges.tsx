import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import { BreakPoints } from '@/constants/break-points';
import useWindowSize from '@/hooks/ui/useWindowSize';

import usePagination from '../../../hooks/utils/usePagination';
import { BadgeSortingKey, SortingDirection } from '../../../models/enums';
import { IBadge } from '../../../models/interfaces';
import { upwardStaggeringAnimations } from '../../../utils/animations.util';
import { BadgeImageMap } from '../../../utils/badge.util';
import { getDateFormat } from '../../../utils/datetime.util';
import { sortBadges } from '../../../utils/sorting-utils/badge.sorting';
import PageNavigation from '../PageNavigation';
import BadgeSorter from '../sorting/BadgeSorter';

import BadgeDetail from './badge-detail/BadgeDetail';
import BadgesInfo from './badges-info/BadgesInfo';

import styles from './Badges.module.scss';

interface Props {
  badges: IBadge[];
  heading?: string | JSX.Element; // heading title
  className?: string;
}

const BADGE_PER_PAGE = 6;
const MOBILE_BADGE_PER_PAGE = 4;

const Badges: React.FC<Props> = ({ heading, badges, className }) => {
  const { width: windowWidth } = useWindowSize();
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const selectedBadge = badges.find((badge) => badge._id === selectedBadgeId);

  const [sortingState, setSortingState] = useState({
    key: BadgeSortingKey.RARITY,
    direction: SortingDirection.DESCENDING,
  });

  const sortedBadges = useMemo(() => {
    return sortBadges(badges, sortingState).slice();
  }, [badges, sortingState]);

  const badgePerPage = useMemo(
    () => (windowWidth < BreakPoints.MOBILE ? MOBILE_BADGE_PER_PAGE : BADGE_PER_PAGE),
    [windowWidth],
  );

  const {
    array: currentPageBadges,
    maxPage,
    page,
    setPage,
  } = usePagination({
    itemPerPage: badgePerPage,
    array: sortedBadges,
    scrollEnabled: false,
  });

  return (
    <section className={className}>
      <div className="mb-2 flex flex-col sm:flex-row gap-y-2 justify-between items-start sm:items-center">
        <div className="flex-start">
          {heading}
          <BadgesInfo className="ml-2 mr-auto" />
        </div>
        <BadgeSorter sortingState={sortingState} setSortingState={setSortingState} />
      </div>
      <div className={`${styles.grid} mt-4`}>
        {currentPageBadges.map((badge, idx) => (
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
            <BadgeCard badge={badge} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} />
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
            className="!z-[200] fixed w-[min(26rem,95vw)] h-[min(90vh,30rem)] top-[calc(50%-(min(90vh,30rem)/2))] left-[calc(50%-(min(26rem,95vw)/2))] bg-gray-50 rounded-md"
          >
            <BadgeDetail badge={selectedBadge} onClose={() => setSelectedBadgeId(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <PageNavigation
        className="mt-4 md:hidden 2xl:hidden"
        currentPage={page}
        maxPage={maxPage}
        onChangePage={setPage}
      />

      <div
        className={`fixed top-0 left-0 h-[100vh] w-[100vw] z-[95] bg-black/50 ${
          selectedBadgeId ? 'block' : 'hidden'
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
      <Image
        className="w-full h-fit"
        src={BadgeImageMap[badge.rarity]}
        alt={`Badge ${badge.name}`}
      />
      <h5 className="font-semibold text-lg text-main-400 whitespace-nowrap">{badge.name}</h5>
      <time className="font-semibold">{getDateFormat(badge.awardedAt)}</time>
      <button className="text-4xl text-main-500">{badge.rarity}</button>
    </div>
  );
};

export default Badges;
