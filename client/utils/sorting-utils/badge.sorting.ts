import { compareByName, compareByDateTime } from '.';
import { BadgeSortingKey, SortingDirection } from '../../models/enums';
import { IBadge } from '../../models/interfaces';
import { compareByRarity } from '../badge.util';

// Sort forums based on forum post sorting key and sorting direction
export function sortBadges(
    badges: IBadge[],
    sortingState: { key: BadgeSortingKey; direction: SortingDirection },
) {
    const isAsc = sortingState.direction === SortingDirection.ASCENDING;
    if (sortingState.key === BadgeSortingKey.NAME) {
        return badges.sort((a, b) => (isAsc ? compareByName(a, b) : compareByName(b, a)));
    }

    if (sortingState.key === BadgeSortingKey.DATETIME) {
        return badges.sort((a, b) =>
            isAsc
                ? compareByDateTime(a.awardedAt, b.awardedAt)
                : compareByDateTime(b.awardedAt, a.awardedAt),
        );
    }

    if (sortingState.key === BadgeSortingKey.RARITY) {
        return badges.sort((a, b) =>
            isAsc
                ? compareByRarity(a.rarity, b.rarity)
                : compareByRarity(b.rarity, a.rarity),
        );
    }

    return badges;
}
