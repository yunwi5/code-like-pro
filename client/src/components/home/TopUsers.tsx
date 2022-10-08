import React, { useMemo } from 'react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useRanking from '../../hooks/ranking/useRanking';
import RankingPodium from '../ranking/sections/RankingPodium';
import ArrowLink from '../ui/links/ArrowLink';

const TopUsers: React.FC = () => {
    const { rankingOrder } = useRanking({});
    const top3Users = useMemo(() => {
        return rankingOrder.slice(0, 3);
    }, [rankingOrder]);

    return (
        <div className="w-full -mt-3 sm:mt-[20rem] lg:mt-10">
            <div className="min-h-[50vh] flex flex-col lg:flex-row justify-around gap-y-12 gap-x-10 h-full py-8 px-4 sm:px-10 md:px-16">
                <div className="order-2 lg:order-none flex-center">
                    <RankingPodium
                        rankingOrder={top3Users}
                        className="w-full lg:w-auto lg:min-w-[65vw] xl:min-w-[50vw]"
                    />
                </div>
                <div className="min-w-[15rem] flex lg:justify-center items-start lg:items-center flex-col text-left">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-text-main-500 text-4xl my-2">Top Users</h1>
                        <h2 className="xl:w-1/2 my-2 leading-7">
                            Take a look at our community of talented developers
                        </h2>
                        <ArrowLink to="/ranking">Ranking</ArrowLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopUsers;
