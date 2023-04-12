import { useQuery } from '@tanstack/react-query';

import { getRanking, getTopicRanking } from '../../apis/ranking.api';
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

function useRankingQuery({ topic, refetchInterval = 3000 }: Props) {
  const { data: response, isLoading } = useQuery(
    ['ranking', topic],
    () => fetchRankingData(topic),
    { refetchInterval: refetchInterval },
  );

  const { data, message: error } = response || {};
  if (error) console.log(error);

  return { rankings: data, isLoading, topic };
}

export default useRankingQuery;
