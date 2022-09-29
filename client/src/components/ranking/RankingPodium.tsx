import React, { useState, useEffect } from 'react';
import { IRanking } from '../../models/interfaces';
import default_profile from './defaultImage/default.jpg';

interface Props {
    rankingArray: IRanking[];
}

const RankingPodium: React.FC<Props> = (props) => {
    let rankingArray = props.rankingArray;

    return (
        <>
            <table className="mb-10">
                <tbody>
                    <tr
                        key="RankingPodium"
                        className="flex flex-nowrap items-end"
                        style={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}
                    >
                        {(() => {
                            let indexOrder = [1, 0, 2];
                            let td = [];
                            let color = '';
                            for (let index of indexOrder) {
                                if (index < rankingArray.length) {
                                    if (index == 0) {
                                        color = '#3c38e0';
                                    }
                                    if (index == 1) {
                                        color = '#5552e4';
                                    }
                                    if (index == 2) {
                                        color = '#6765e7';
                                    }
                                    td.push(
                                        <td
                                            key={'RankingPodiumTd' + index.toString()}
                                            style={{
                                                wordBreak: 'keep-all',
                                                wordWrap: 'break-word',
                                            }}
                                            className="text-center text-gray-800 font-bold px-8 inline-block align-bottom"
                                        >
                                            <img
                                                src={
                                                    rankingArray[index].pictureUrl ||
                                                    default_profile
                                                }
                                                className="rounded-full h-20 w-20 inline-block"
                                            />
                                            <div className="py-5">
                                                {rankingArray[index].name}
                                            </div>
                                            <div
                                                style={{
                                                    height: 100 - index * 25,
                                                    color: color,
                                                }}
                                                className={
                                                    'w-48 text-4xl flex flex-row items-center rounded-lg justify-center text-gray-700 bg-gray-100 shadow-lg'
                                                }
                                            >
                                                {index + 1}
                                            </div>
                                        </td>,
                                    );
                                }
                            }
                            return td;
                        })()}
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default RankingPodium;
