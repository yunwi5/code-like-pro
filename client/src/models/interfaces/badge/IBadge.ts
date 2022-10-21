export interface IBadge {
    _id?: string;
    name: string;
    category: string;
    description: string;
    rarity: string;
    awardedAt:Date;
    __v?: number;
}