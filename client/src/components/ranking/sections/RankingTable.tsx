import React from 'react';
import usePagination from '../../../hooks/usePagination';
import { RankingCategory } from '../../../models/enums';
import { IRanking } from '../../../models/interfaces';
import PageNavigation from '../../ui/PageNavigation';
import ProfileView from '../../ui/user/profile-view/ProfileView';
import ProfilePicture from '../../ui/user/ProfilePicture';

interface Props {
    rankingOrder: IRanking[];
    rankingCategory: RankingCategory; // selected ranking category by the user
}

function getDisplayRankingPoints(rank: IRanking, rankingCategory: RankingCategory) {
    if (rankingCategory === RankingCategory.CREATION) return rank.creationPoints;
    if (rankingCategory === RankingCategory.SOLVING) return rank.solvingPoints;
    return rank.creationPoints + rank.solvingPoints;
}

const RankingTable: React.FC<Props> = ({ rankingOrder, rankingCategory }) => {
    const numOfUsersPerPage = 10;
    let {
        array: currentPageRanking,
        page: currentPage,
        setPage,
        maxPage,
    } = usePagination({ array: rankingOrder, itemPerPage: numOfUsersPerPage });

    return (
        <div>
            <table className="w-full flex flex-col">
                <thead>
                    <tr className="flex border-b border-gray-300/90 text-gray-500">
                        <th className={'basis-1/6 font-bold text-left px-3 py-2'}>
                            Rank
                        </th>
                        <th className={'basis-3/6 font-bold text-left px-3 py-2'}>
                            User
                        </th>
                        <th
                            className={
                                'basis-2/6 font-bold text-right p-2 whitespace-nowrap'
                            }
                        >
                            {rankingCategory}{' '}
                            <span className="hidden lg:inline">Acquired</span> Points
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageRanking.map((userRank, idx) => (
                        <tr
                            key={userRank._id}
                            className="flex even:bg-gray-50/80 odd:bg-gray-100/80 text-gray-500 transition-all hover:bg-slate-200/70 border-b-[1.5px] border-gray-200/90"
                        >
                            <td className="basis-1/6 flex-start px-3 py-3 font-bold whitespace-nowrap">
                                No. {currentPage * numOfUsersPerPage + idx + 1}
                            </td>
                            <td className="basis-3/6 flex-start gap-2 lg:gap-5 px-3 py-3 font-semibold cursor-pointer">
                                <ProfileView user={userRank} />
                            </td>
                            <td className="basis-2/6 flex-center pl-8 py-3 font-semibold">
                                {getDisplayRankingPoints(userRank, rankingCategory)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PageNavigation
                className="mt-10"
                currentPage={currentPage}
                totalPages={maxPage}
                onChangePage={(newPage: number) => setPage(newPage)}
            />
        </div>
    );
};

export default RankingTable;
