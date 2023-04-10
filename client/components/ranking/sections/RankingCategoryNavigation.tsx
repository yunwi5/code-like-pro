import React from 'react';
import { RankingCategory, RankingCategoryList } from '../../../models/enums';
import { IRanking } from '../../../models/interfaces';

interface Props {
  rankingCategory: RankingCategory;
  setRankingCategory: React.Dispatch<React.SetStateAction<RankingCategory>>;
  rankingOrder: IRanking[];
}

// Mobile layout breakpoint is sm - 640px.
const RankingCategoryNavigation: React.FC<Props> = (props) => {
  const { rankingOrder, rankingCategory, setRankingCategory } = props;

  return (
    <section className="flex flex-col sm:flex-row justify-between items-center gap-3">
      <div className="self-stretch flex">
        {RankingCategoryList.map((category) => (
          <button
            key={category}
            className={`flex-1 mr-3 px-3 py-2 min-w-[6.3rem] rounded-full shadow hover:text-main-500 hover:bg-gray-200 ${
              category === rankingCategory
                ? 'bg-gray-600 hover:bg-gray-700 !text-gray-50'
                : 'bg-gray-100'
            }`}
            onClick={() => setRankingCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <h3 className="self-end pr-4 hidden sm:block text-lg text-gray-500 font-semibold">
        Total {rankingOrder.length} Users
      </h3>
    </section>
  );
};

export default RankingCategoryNavigation;
