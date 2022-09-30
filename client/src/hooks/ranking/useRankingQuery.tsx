import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getRanking, getTopicRanking } from '../../apis/ranking';
import { ProgrammingTopic } from '../../models/enums';

interface Props {
    topic?: ProgrammingTopic | undefined;
    refetchInterval?: number;
}

function fetchRankingData(topic: ProgrammingTopic | undefined) {
    if (!topic) {
        return getRanking();
    }
    return getTopicRanking(topic);
}

function useRankingQuery({ topic: defaultTopic, refetchInterval = 3000 }: Props) {
    const [topic, setTopic] = useState<ProgrammingTopic | undefined>(defaultTopic);
    const { data: response, isLoading } = useQuery(
        ['ranking', topic],
        () => fetchRankingData(topic),
        { refetchInterval: refetchInterval },
    );

    const { data, message: error } = response || {};
    if (error) console.log(error);

    return { ranking: data || [], isLoading, topic, setTopic };
}

export default useRankingQuery;
