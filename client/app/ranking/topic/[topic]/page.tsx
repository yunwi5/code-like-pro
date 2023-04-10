import React from 'react';
import { Metadata } from 'next';
import { getTopicRankingData } from '@/apis/ranking.api';
import RankingMain from '@/components/ranking/RankingMain';
import { AppProperty } from '@/constants';
import { ProgrammingTopic, ProgrammingTopicList } from '@/models/enums';
import { deslugify } from '@/utils/string-utils/url.util';

type TopicRankingProps = {
  params: { topic: string };
};

export async function generateMetadata({
  params: { topic: topicParam },
}: TopicRankingProps): Promise<Metadata> {
  const topic = deslugify(topicParam);

  return {
    title: `${topic} Ranking | ${AppProperty.APP_NAME}`,
    description: `Ranking page for a topic ${topic}, where users can browse their rankings for each specific programming topic.`,
  };
}

async function TopicRanking({ params: { topic: topicQueryString } }: TopicRankingProps) {
  const topic = deslugify(topicQueryString) as ProgrammingTopic;
  if (topic == null || ProgrammingTopicList.includes(topic) === false) {
    throw new Error('Non existing topic');
  }

  const topicRankingData = await getTopicRankingData(topic);
  if (topicRankingData == null) {
    throw new Error('Could not fetch topic ranking data');
  }

  return <RankingMain rankings={topicRankingData} topic={topic} />;
}

export default TopicRanking;
