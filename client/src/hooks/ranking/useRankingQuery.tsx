import React from 'react';
import { ProgrammingTopic } from '../../models/enums';

interface Props {
    topic?: ProgrammingTopic;
    refetchInterval?: number;
}
function useRankingQuery({ topic, refetchInterval }: Props) {
    return <div>useRankingQuery</div>;
}

export default useRankingQuery;
