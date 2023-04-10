'use client';
import React, { FC } from 'react';
import { ProgrammingTopic } from '@/models/enums';
import { IRanking } from '@/models/interfaces';

import useRanking from '../../hooks/ranking/useRanking';
import RankingCategoryNavigation from './sections/RankingCategoryNavigation';
import RankingPodium from './sections/RankingPodium';
import RankingTable from './sections/RankingTable';

type RankingMainProps = {
  rankings: IRanking[];
  topic?: ProgrammingTopic;
};

const RankingMain: FC<RankingMainProps> = ({ rankings: initialRankings, topic }) => {
  const { rankingOrder, rankingCategory, setRankingCategory } = useRanking({
    topic,
    initialRankings,
    refetchInterval: 5000,
  });

  return (
    <main className="min-w-[95vw] md:min-w-[70vw] xl:min-w-[min(50vw,51rem)] flex flex-col gap-5 text-gray-600">
      <RankingPodium rankingOrder={rankingOrder} className="mb-5" />
      <RankingCategoryNavigation
        rankingCategory={rankingCategory}
        setRankingCategory={setRankingCategory}
        rankingOrder={rankingOrder}
      />
      <RankingTable rankingOrder={rankingOrder} rankingCategory={rankingCategory} />
    </main>
  );
};

export default RankingMain;
