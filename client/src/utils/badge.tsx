import { BadgeImages } from '../assets/badgeImages';
import { BadgeRarity } from '../models/enums';
import { IBadge } from '../models/interfaces';
import { customToastNotify } from './notification';
import NotificationBadge from '../components/profile/badges/NotificationBadge';

export const RARITY_N_CUT = 1;
export const RARITY_R_CUT = 5;
export const RARITY_SR_CUT = 10;
export const RARITY_UR_CUT = 30;

export type RarityBreakpoint = 1 | 5 | 10 | 30;

export const BadgeImageMap = {
    [BadgeRarity.N]: BadgeImages.BadgeN,
    [BadgeRarity.R]: BadgeImages.BadgeR,
    [BadgeRarity.SR]: BadgeImages.BadgeSR,
    [BadgeRarity.UR]: BadgeImages.BadgeUR,
};

export const BadgeRarityPoints: { [key: string]: RarityBreakpoint } = {
    [BadgeRarity.N]: RARITY_N_CUT,
    [BadgeRarity.R]: RARITY_R_CUT,
    [BadgeRarity.SR]: RARITY_SR_CUT,
    [BadgeRarity.UR]: RARITY_UR_CUT,
};

export const BadgeRarityFullNames = {
    [BadgeRarity.UR]: 'Ultimate Rare',
    [BadgeRarity.SR]: 'Super Rare',
    [BadgeRarity.R]: 'Rare',
    [BadgeRarity.N]: 'Normal',
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
