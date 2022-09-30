import React, { useMemo, useState } from 'react';
import { ProgrammingTopic, RankingCategory } from '../../models/enums';
import { sortRankingArray } from '../../utils/sorting-utils/ranking.sorting';
import useRankingQuery from './useRankingQuery';

interface Props {
    topic?: ProgrammingTopic;
    refetchInterval?: number;
}
function useRanking({ topic: defaultTopic, refetchInterval }: Props) {
    const [rankingCategory, setRankingCategory] = useState(RankingCategory.OVERALL);
    const { ranking, topic, setTopic } = useRankingQuery({
        topic: defaultTopic,
        refetchInterval,
    });

    const rankingOrder = useMemo(() => {
        return sortRankingArray(ranking, rankingCategory).slice();
    }, [ranking, rankingCategory]);

    return { rankingOrder, topic, setTopic, rankingCategory, setRankingCategory };
}

export default useRanking;
