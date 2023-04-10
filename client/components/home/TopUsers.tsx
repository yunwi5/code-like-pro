import React from 'react';
import useRanking from '../../hooks/ranking/useRanking';
import RankingPodium from '../ranking/sections/RankingPodium';
import ArrowLink from '../ui/links/ArrowLink';

const TopUsers: React.FC = () => {
  const { rankingOrder } = useRanking();
  const top3Users = rankingOrder.slice(0, 3);

  return (
    <section className="w-[clamp(20rem,85rem,97vw)] mx-auto">
      <div className="flex flex-col lg:flex-row justify-around gap-y-12 gap-x-10 xl:gap-x-20 h-full py-3 lg:py-8 px-4 sm:px-10 md:px-16">
        <div className="order-2 lg:order-none flex-center">
          <RankingPodium
            rankingOrder={top3Users}
            className="w-full lg:w-auto lg:min-w-[65vw] xl:min-w-[50vw]"
          />
        </div>
        <div className="min-w-[15rem] flex lg:justify-center items-start lg:items-center flex-col text-left">
          <div className="flex flex-col justify-start">
            <h1 className="my-2 text-gray-600 text-4xl">Top Users</h1>
            <h2 className="lg:w-[70%] my-2 leading-7">
              Top ranked users who are essentially the most talented programmers in our
              platform.
            </h2>
            <ArrowLink to="/ranking">Ranking</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopUsers;
