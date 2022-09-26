import { getRanking } from '../../apis/ranking';
import React, { useState, useEffect } from 'react';
import { IRanking } from '../../models/interfaces';
import PageNavigation from '../ui/PageNavigation';
import usePagination from '../../hooks/usePagination';
import default_profile from './defaultImage/default.jpg';
import RankingPodium from './RankingPodium';

const Rank: React.FC = () => {
    // State Handling Part
    let [error, setError] = useState('');
    let para: IRanking[] = [];
    let [rankingArray, setRanking] = useState(para);
    let [scoreMode, setScoreMode] = useState('');
    useEffect(() => {
        getRanking().then((res) => {
            if (res.ok && res.data) {
                setRanking(res.data);
            }
            if (!res.ok && res.message) {
                setError(res.message);
            }
        });
    }, para);
    if (error) {
        console.log('Ranking fetch error: cannot fetch data from the server!');
    }
    let rankOverall = [...rankingArray];
    let rankCreation = [...rankingArray];
    let rankSolving = [...rankingArray];
    sortRank(1, rankOverall);
    sortRank(2, rankCreation);
    sortRank(3, rankSolving);
    //setRanking(rankOverall); // Too many re-renders error!
    //setScoreMode('Overall '); // Too many re-renders error!

    // Local functions
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
    function sortRank(mode: number, array: IRanking[]) {
        if (mode == 1) {
            array.sort((a, b) =>
                a.creationPoints + a.solvingPoints < b.creationPoints + b.solvingPoints
                    ? 1
                    : -1,
            );
        } // Overall mode
        if (mode == 2) {
            array.sort((a, b) => (a.creationPoints < b.creationPoints ? 1 : -1));
        } // Creation mode
        if (mode == 3) {
            array.sort((a, b) => (a.solvingPoints < b.solvingPoints ? 1 : -1));
        } // Solving mode
    }

    // Local variables
    const buttonStyle = 'w-24 h-10 p-2 m-2 bg-gray-100 rounded-2xl shadow hover:bg-main-100';
    const numOfUsersPerPage = 5;
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
                                className={buttonStyle}
                                onClick={() => {
                                    setRanking(rankOverall);
                                    setScoreMode('Overall ');
                                }}
                            >
                                Overall
                            </button>
                        </td>
                        <td>
                            <button
                                className={buttonStyle}
                                onClick={() => {
                                    setRanking(rankCreation);
                                    setScoreMode('Creation ');
                                }}
                            >
                                Creation
                            </button>
                        </td>
                        <td>
                            <button
                                className={buttonStyle}
                                onClick={() => {
                                    setRanking(rankSolving);
                                    setScoreMode('Solving ');
                                }}
                            >
                                Solving
                            </button>
                        </td>
                        <td className="font-bold pl-12 text-gray-800">
                            Total {NumberHandling(rankingArray.length)} Users
                        </td>
                    </tr>
                    {(() => {
                        let index = 1;
                        let tr = [];
                        let headStyle = 'font-bold text-gray-800 text-center p-2 pt-6';
                        let cellStyle = 'p-4';
                        tr.push(
                            <tr className="border-b border-gray-400" key="RankHeader">
                                <td className={headStyle + ' pr-12'}>Rank</td>
                                <td className={headStyle}>User</td>
                                <td></td>
                                <td className={headStyle}>{scoreMode}Acquired Points</td>
                            </tr>,
                        );
                        let oddChildColor = ' bg-gray-100';
                        let evenChildColor = '';
                        for (let user of page) {
                            if (user.pictureUrl) console.log({ user });
                            if (index % 2 == 0) {
                                tr.push(
                                    <tr
                                        className={'border-t border-gray-300' + oddChildColor}
                                        key={'Rank' + index.toString()}
                                    >
                                        <td
                                            className={
                                                cellStyle + ' font-bold pr-10 text-gray-800'
                                            }
                                        >
                                            No.{index + currentPage * numOfUsersPerPage}
                                        </td>
                                        <td className={cellStyle}>
                                            <img
                                                src={user.pictureUrl}
                                                className="rounded-full h-10 w-10 inline ml-4"
                                            />
                                        </td>
                                        <td className="pr-64">{user.name}</td>
                                        <td className={cellStyle + ' px-5 text-center'}>
                                            {(() => {
                                                if (scoreMode == 'Overall ') {
                                                    return (
                                                        user.creationPoints +
                                                        user.solvingPoints
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
                                    </tr>,
                                );
                            } else {
                                tr.push(
                                    <tr
                                        className={'border-t border-gray-300' + evenChildColor}
                                        key={'Rank' + index.toString()}
                                    >
                                        <td
                                            className={
                                                cellStyle + ' font-bold pr-10 text-gray-800'
                                            }
                                        >
                                            No.{index + currentPage * numOfUsersPerPage}
                                        </td>
                                        <td className={cellStyle}>
                                            <img
                                                src={user.pictureUrl && default_profile}
                                                className="rounded-full h-10 w-10 inline ml-4"
                                            />
                                        </td>
                                        <td className="pr-64">{user.name}</td>
                                        <td className={cellStyle + ' px-5 text-center'}>
                                            {(() => {
                                                if (scoreMode == 'Overall ') {
                                                    return (
                                                        user.creationPoints +
                                                        user.solvingPoints
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
                                    </tr>,
                                );
                            }

                            index += 1;
                        }
                        return tr;
                    })()}
                </tbody>
            </table>
            <div style={{ width: 800 }} className="mt-10 scale-75 inline-block item-center">
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
