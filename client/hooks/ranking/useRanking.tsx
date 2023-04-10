import { IRanking } from '@/models/interfaces';
import { useCallback, useMemo, useState } from 'react';
import { ProgrammingTopic, RankingCategory } from '../../models/enums';
import { sortRankingArray } from '../../utils/sorting-utils/ranking.sorting';
import useRankingQuery from './useRankingQuery';

interface Props {
  topic?: ProgrammingTopic;
  refetchInterval?: number;
  initialRankings?: IRanking[];
}
function useRanking(props: Props = {}) {
  const { topic, refetchInterval, initialRankings } = props;
  const [rankingCategory, setRankingCategory] = useState(RankingCategory.OVERALL);
  const { rankings = initialRankings ?? [] } = useRankingQuery({
    topic,
    refetchInterval,
  });

  const rankingOrder = useMemo(() => {
    return sortRankingArray(rankings, rankingCategory).slice();
  }, [rankings, rankingCategory]);

  const getUserRank = useCallback(
    (userId: string) => {
      const userRankIndex = rankingOrder.findIndex((userData) => userData._id === userId);
      if (userRankIndex < 0) return null;

      return { ...rankingOrder[userRankIndex], order: userRankIndex + 1 };
    },
    [rankingOrder],
  );

  return { rankingOrder, rankingCategory, setRankingCategory, getUserRank };
}

export default useRanking;
