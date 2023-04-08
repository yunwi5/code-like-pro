import React, { useCallback, useMemo, useState } from 'react';
import { ProgrammingTopic, RankingCategory } from '../../models/enums';
import { sortRankingArray } from '../../utils/sorting-utils/ranking.sorting';
import useRankingQuery from './useRankingQuery';

interface Props {
  topic?: ProgrammingTopic;
  refetchInterval?: number;
}
function useRanking(props: Props = {}) {
  const { topic, refetchInterval } = props;
  const [rankingCategory, setRankingCategory] = useState(RankingCategory.OVERALL);
  const { ranking, isLoading } = useRankingQuery({
    topic,
    refetchInterval,
  });

  const rankingOrder = useMemo(() => {
    return sortRankingArray(ranking, rankingCategory).slice();
  }, [ranking, rankingCategory]);

  // Receive userId, and returns the rank order of that user, as well as ranking points.
  const getUserRank = useCallback(
    (userId: string) => {
      const userRankIndex = rankingOrder.findIndex((userData) => userData._id === userId);
      if (userRankIndex < 0) return null;

      return { ...rankingOrder[userRankIndex], order: userRankIndex + 1 };
    },
    [rankingOrder],
  );

  return { rankingOrder, rankingCategory, setRankingCategory, getUserRank, isLoading };
}

export default useRanking;
