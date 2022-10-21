import { BadgeRarity } from '../../enums';

export interface IBadge {
    _id: string;
    name: string;
    category: string;
    description: string;
    rarity: BadgeRarity;
    awardedAt: string; // ISO datetime string
}
