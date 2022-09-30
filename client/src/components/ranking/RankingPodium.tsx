import React, { useState, useEffect } from 'react';
import { IRanking } from '../../models/interfaces';
import default_profile from './defaultImage/default.jpg';

interface Props {
    rankingArray: IRanking[];
}

const RankingPodium: React.FC<Props> = (props) => {
    let rankingArray = props.rankingArray;
    let order = [1, 0, 2];
    let colors = ['#3c38e0', '#6a38e0', '#9238e0'];

    return (
        <>
            <table className="mb-10">
                <tbody>
                    <tr
                        key="RankingPodium"
                        className="flex flex-nowrap items-end"
                        style={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}
                    >
                        {order.map((index) =>
                            index < rankingArray.length ? (
                                <td
                                    key={'RankingPodiumTd' + index.toString()}
                                    style={{
                                        wordBreak: 'keep-all',
                                        wordWrap: 'break-word',
                                    }}
                                    className="text-center text-gray-600 font-bold px-8 inline-block align-bottom"
                                >
                                    <img
                                        src={
                                            rankingArray[index].pictureUrl ||
                                            default_profile
                                        }
                                        className="rounded-full h-20 w-20 inline-block"
                                    />
                                    <div className="py-5">{rankingArray[index].name}</div>
                                    <div
                                        style={{
                                            height: 100 - index * 25,
                                            color:
                                                index != 0
                                                    ? index != 1
                                                        ? colors[2]
                                                        : colors[1]
                                                    : colors[0],
                                            minWidth: 180,
                                        }}
                                        className={
                                            'text-4xl flex flex-row items-center rounded-lg justify-center text-gray-600 bg-gray-100 shadow-lg'
                                        }
                                    >
                                        {index + 1}
                                    </div>
                                </td>
                            ) : (
                                ''
                            ),
                        )}
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default RankingPodium;
