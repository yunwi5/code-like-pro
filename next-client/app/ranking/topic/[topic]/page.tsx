import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTopicRankingData } from '@/apis/ranking.api';
import RankingMain from '@/components/ranking/RankingMain';
import { AppProperty } from '@/constants';
import { ProgrammingTopic, ProgrammingTopicList } from '@/models/enums';
import { deslugify, slugify } from '@/utils/string-utils/url.util';

type TopicRankingProps = {
  params: { topic: string };
};

export const revalidate = 60;

export async function generateMetadata({
  params: { topic: topicParam },
}: TopicRankingProps): Promise<Metadata> {
  const topic = deslugify(topicParam);

  return {
    title: `${topic} Ranking | ${AppProperty.APP_NAME}`,
    description: `Ranking page for a topic ${topic}, where users can browse their rankings for each specific programming topic.`,
  };
}

export async function generateStaticParams() {
  return ProgrammingTopicList.map((topic) => ({ topic: slugify(topic) }));
}

async function TopicRanking({ params: { topic: topicQueryString } }: TopicRankingProps) {
  const topic = deslugify(topicQueryString) as ProgrammingTopic;
  if (topic == null || ProgrammingTopicList.includes(topic) === false) {
    notFound();
  }

  const topicRankingData = await getTopicRankingData(topic, {
    catchErrors: false,
    authDisabled: true,
  });
  if (topicRankingData == null) {
    throw new Error('Could not fetch topic ranking data');
  }

  return <RankingMain rankings={topicRankingData} topic={topic} />;
}

export default TopicRanking;
