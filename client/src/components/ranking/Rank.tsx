import React, { useState, useEffect } from 'react';
import { getRanking } from '../../apis/ranking';
import { IRanking } from '../../models/interfaces';
import PageNavigation from '../ui/PageNavigation';
import usePagination from '../../hooks/usePagination';
import default_profile from './defaultImage/default.jpg';
import RankingPodium from './RankingPodium';

function NumberHandling(number: any) {
    if (typeof number != 'number') {
        return null;
    }
    let result = '';
    let remainingNumber = number;
    while (remainingNumber >= 1000) {
        result = ', ' + (remainingNumber % 1000).toString() + result;
        remainingNumber = (remainingNumber - (remainingNumber % 1000)) / 1000;
    }
    result = remainingNumber.toString() + result;
    return result;
}

const Rank: React.FC = () => {
    // State Handling Part
    let [error, setError] = useState('');
    let para: IRanking[] = [];
    let [rankingArray, setRanking] = useState(para);
    let [scoreMode, setScoreMode] = useState('');
    useEffect(() => {
        getRanking().then((res) => {
            if (res.ok && res.data) {
                setRanking(
                    res.data.sort((a, b) =>
                        a.creationPoints + a.solvingPoints <
                        b.creationPoints + b.solvingPoints
                            ? 1
                            : -1,
                    ),
                );
                setScoreMode('Overall ');
            }
            if (!res.ok && res.message) {
                setError(res.message);
            }
        });
    }, para);
    if (error) {
        console.log('Ranking fetch error: cannot fetch data from the server!');
    }

    // Local variables
    const buttonStyle = 'w-24 h-10 p-2 m-2 rounded-2xl shadow hover:bg-main-100';
    const numOfUsersPerPage = 6;
    let {
        array: page,
        page: currentPage,
        setPage,
        maxPage,
    } = usePagination({ array: rankingArray, itemPerPage: numOfUsersPerPage });

    // Component
    return (
        <>
            <RankingPodium rankingArray={rankingArray} />
            <table className="flex-auto">
                <tbody>
                    <tr key="RankStatistic" className="col-span-full">
                        <td>
                            <button
                                className={
                                    buttonStyle +
                                    (scoreMode === 'Overall '
                                        ? ' bg-gray-300'
                                        : ' bg-gray-100')
                                }
                                onClick={() => {
                                    setRanking(() => {
                                        return rankingArray.sort((a, b) =>
                                            a.creationPoints + a.solvingPoints <
                                            b.creationPoints + b.solvingPoints
                                                ? 1
                                                : -1,
                                        );
                                    });
                                    setScoreMode('Overall ');
                                }}
                            >
                                Overall
                            </button>
                        </td>
                        <td>
                            <button
                                className={
                                    buttonStyle +
                                    (scoreMode === 'Creation '
                                        ? ' bg-gray-300'
                                        : ' bg-gray-100')
                                }
                                onClick={() => {
                                    setRanking(() => {
                                        return rankingArray.sort((a, b) =>
                                            a.creationPoints < b.creationPoints ? 1 : -1,
                                        );
                                    });
                                    setScoreMode('Creation ');
                                }}
                            >
                                Creation
                            </button>
                        </td>
                        <td>
                            <button
                                className={
                                    buttonStyle +
                                    (scoreMode === 'Solving '
                                        ? ' bg-gray-300'
                                        : ' bg-gray-100')
                                }
                                onClick={() => {
                                    setRanking(() => {
                                        return rankingArray.sort((a, b) =>
                                            a.solvingPoints < b.solvingPoints ? 1 : -1,
                                        );
                                    });
                                    setScoreMode('Solving ');
                                }}
                            >
                                Solving
                            </button>
                        </td>
                        <td className="font-bold pl-12 text-gray-600">
                            Total {NumberHandling(rankingArray.length)} Users
                        </td>
                    </tr>
                    <tr className="border-b border-gray-400" key="RankHeader">
                        <td
                            className={
                                'font-bold text-gray-600 text-center p-2 pt-6 pr-12'
                            }
                        >
                            Rank
                        </td>
                        <td className={'font-bold text-gray-600 text-center p-2 pt-6'}>
                            User
                        </td>
                        <td></td>
                        <td className={'font-bold text-gray-600 text-center p-2 pt-6'}>
                            {scoreMode}Acquired Points
                        </td>
                    </tr>
                    {rankingArray.map((user, index) =>
                        index >= currentPage * numOfUsersPerPage &&
                        index < (currentPage + 1) * numOfUsersPerPage ? (
                            <tr
                                className={
                                    'border-t border-gray-300' +
                                    (index % 2 === 1 ? ' bg-gray-100' : '')
                                }
                                key={'Rank' + index.toString()}
                            >
                                <td className="p-4 font-bold pr-10 text-gray-600">
                                    No.{index + 1}
                                </td>
                                <td className="p-4">
                                    <img
                                        src={user.pictureUrl || default_profile}
                                        className="rounded-full h-10 w-10 inline ml-4"
                                    />
                                </td>
                                <td className="p-4 pr-64">{user.name}</td>
                                <td className="p-4 text-center px-5">
                                    {(() => {
                                        if (scoreMode == 'Overall ') {
                                            return (
                                                user.creationPoints + user.solvingPoints
                                            );
                                        }
                                        if (scoreMode == 'Creation ') {
                                            return user.creationPoints;
                                        }
                                        if (scoreMode == 'Solving ') {
                                            return user.solvingPoints;
                                        }
                                        return '';
                                    })()}
                                </td>
                            </tr>
                        ) : (
                            ''
                        ),
                    )}
                </tbody>
            </table>
            <div
                style={{ width: 800 }}
                className="mt-10 scale-75 inline-block item-center"
            >
                <PageNavigation
                    currentPage={currentPage}
                    totalPages={maxPage}
                    onChangePage={(newPage: number) => setPage(newPage)}
                />
            </div>
        </>
    );
};

export default Rank;
