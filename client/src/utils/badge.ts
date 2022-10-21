import { BadgeImages } from '../assets/badgeImages';
import { BadgeRarity } from '../models/enums';

export const BadgeImageMap = {
    [BadgeRarity.N]: BadgeImages.BadgeN,
    [BadgeRarity.R]: BadgeImages.BadgeR,
    [BadgeRarity.SR]: BadgeImages.BadgeSR,
    [BadgeRarity.UR]: BadgeImages.BadgeUR,
};

export const BadgeRarityPoints = {
    [BadgeRarity.N]: 1,
    [BadgeRarity.R]: 2,
    [BadgeRarity.SR]: 3,
    [BadgeRarity.UR]: 5,
};

export const compareByRarity = (r1: BadgeRarity, r2: BadgeRarity) => {
    return (BadgeRarityPoints[r1] || 0) - (BadgeRarityPoints[r2] || 0);
};
