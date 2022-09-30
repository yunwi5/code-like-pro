import React from 'react';
import { useParams } from 'react-router-dom';
import useRanking from '../../hooks/ranking/useRanking';
import {
    ProgrammingTopic,
    ProgrammingTopicList,
    RankingCategoryList,
} from '../../models/enums';
import RankingPodium from './sections/RankingPodium';
import RankingTable from './sections/RankingTable';

function useTopicParam() {
    const topic = useParams().topic;
    if (ProgrammingTopicList.includes(topic as any)) return topic as ProgrammingTopic;
    return undefined;
}

const RankingMain: React.FC = () => {
    const topic = useTopicParam();
    const { rankingOrder, rankingCategory, setRankingCategory } = useRanking({ topic });

    return (
        <main className="min-w-[min(50vw,51rem)] flex flex-col gap-5 text-gray-600">
            <RankingPodium rankingOrder={rankingOrder} className="mb-5" />
            <section className="flex justify-between items-center">
                <div>
                    {RankingCategoryList.map((category) => (
                        <button
                            className={`mr-3 px-3 py-2 min-w-[6.3rem] rounded-full shadow hover:bg-gray-200 ${
                                category === rankingCategory
                                    ? 'bg-gray-600 hover:bg-gray-700 text-gray-50'
                                    : 'bg-gray-100'
                            }`}
                            onClick={() => setRankingCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <h3 className="pr-2 text-lg text-gray-500 font-semibold">
                    Total {rankingOrder.length} Users
                </h3>
            </section>
            <RankingTable rankingOrder={rankingOrder} rankingCategory={rankingCategory} />
        </main>
    );
};

export default RankingMain;
