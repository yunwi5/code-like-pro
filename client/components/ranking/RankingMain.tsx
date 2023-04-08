import { useTopicParam } from '@/hooks/utils/useTopicParam';
import React from 'react';
import { ClockLoader } from 'react-spinners';

import useRanking from '../../hooks/ranking/useRanking';
import RankingCategoryNavigation from './sections/RankingCategoryNavigation';
import RankingPodium from './sections/RankingPodium';
import RankingTable from './sections/RankingTable';

const RankingMain: React.FC = () => {
  const topic = useTopicParam();
  const { rankingOrder, rankingCategory, setRankingCategory, isLoading } = useRanking({
    topic,
  });

  return (
    <main className="min-w-[95vw] md:min-w-[70vw] xl:min-w-[min(50vw,51rem)] flex flex-col gap-5 text-gray-600">
      {isLoading && (
        <div className="w-full min-h-[90vh] flex-center">
          <ClockLoader size={200} color="#5552e4" />
        </div>
      )}
      {!isLoading && (
        <>
          <RankingPodium rankingOrder={rankingOrder} className="mb-5" />
          {/* Component for selecting one of "Overall" | "Creation" | "Solving" categories */}
          <RankingCategoryNavigation
            rankingCategory={rankingCategory}
            setRankingCategory={setRankingCategory}
            rankingOrder={rankingOrder}
          />
          <RankingTable rankingOrder={rankingOrder} rankingCategory={rankingCategory} />
        </>
      )}
    </main>
  );
};

export default RankingMain;
