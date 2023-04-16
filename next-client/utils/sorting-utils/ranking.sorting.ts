import { RankingCategory } from '../../models/enums';
import { IRanking } from '../../models/interfaces';

// Used for sorting ranking array based on "Overall" | "Creation" | "Solving" categories.
export function sortRankingArray(ranking: IRanking[], rankingCategory: RankingCategory) {
  if (rankingCategory === RankingCategory.CREATION) {
    // Sort by creation points descending order
    return ranking.sort((userA, userB) => userB.creationPoints - userA.creationPoints);
  } else if (rankingCategory === RankingCategory.SOLVING) {
    // Sort by solving points descending order
    return ranking.sort((userA, userB) => userB.solvingPoints - userA.solvingPoints);
  }

  // Sort by Overall points, meaning sort by solvingPoints + creationPoints.
  return ranking.sort(
    (userA, userB) =>
      userB.solvingPoints + userB.creationPoints - userA.solvingPoints - userA.creationPoints,
  );
}
