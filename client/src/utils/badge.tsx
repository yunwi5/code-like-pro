import { BadgeImages } from '../assets/badgeImages';
import NotificationBadge from '../components/profile/badges/NotificationBadge';
import { BadgeRarity } from '../models/enums';
import { IBadge } from '../models/interfaces';
import { customToastNotify } from './notification';

export type RarityBreakpoint = 1 | 5 | 10 | 30;

export const BadgeImageMap = {
    [BadgeRarity.N]: BadgeImages.BadgeN,
    [BadgeRarity.R]: BadgeImages.BadgeR,
    [BadgeRarity.SR]: BadgeImages.BadgeSR,
    [BadgeRarity.UR]: BadgeImages.BadgeUR,
};

export const BadgeRarityPoints: { [key: string]: RarityBreakpoint } = {
    [BadgeRarity.N]: 1,
    [BadgeRarity.R]: 5,
    [BadgeRarity.SR]: 10,
    [BadgeRarity.UR]: 30,
};

export const compareByRarity = (r1: BadgeRarity, r2: BadgeRarity) => {
    return (BadgeRarityPoints[r1] || 0) - (BadgeRarityPoints[r2] || 0);
};

// Notification function triggered when the user gets a new badge
export function notifyBadgeRewards(rewardResults: (IBadge | undefined)[]) {
    rewardResults.forEach((data) => {
        if (!data?._id) return;
        customToastNotify({
            message: <NotificationBadge badge={data} />,
            toastId: `${data.category}-${data.rarity}`,
            autoClose: 3000,
            className: '!h-[15rem] !min-w-[30rem]',
        });
    });
}
