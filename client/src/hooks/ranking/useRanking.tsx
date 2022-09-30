import React, { useMemo, useState } from 'react';
import { ProgrammingTopic, RankingCategory } from '../../models/enums';
import { sortRankingArray } from '../../utils/sorting-utils/ranking.sorting';
import useRankingQuery from './useRankingQuery';

interface Props {
    topic?: ProgrammingTopic;
    refetchInterval?: number;
}
function useRanking({ topic, refetchInterval }: Props) {
    const [rankingCategory, setRankingCategory] = useState(RankingCategory.OVERALL);
    const { ranking, isLoading } = useRankingQuery({
        topic,
        refetchInterval,
    });

    const rankingOrder = useMemo(() => {
        return sortRankingArray(ranking, rankingCategory).slice();
    }, [ranking, rankingCategory]);

    return { rankingOrder, rankingCategory, setRankingCategory, isLoading };
}

export default useRanking;
