import React, { useState, useEffect } from 'react';
import { IRanking } from '../../../models/interfaces';
import default_profile from '../defaultImage/default.jpg';

interface Props {
    rankingOrder: IRanking[];
    className?: string;
}

const podiumOrder = [1, 0, 2];
const colorClasses = ['text-main-400', 'text-violet-500', 'text-purple-500'];

const RankingPodium: React.FC<Props> = ({ rankingOrder, className = '' }) => {
    return (
        <section className={`flex justify-between items-end gap-14 px-1 ${className}`}>
            {podiumOrder.map((rankIndex) => {
                if (rankIndex >= rankingOrder.length) return null;

                return (
                    <div key={rankIndex} className="grow flex flex-col">
                        <div className="text-center text-gray-500 text-lg font-bold inline-block">
                            <img
                                src={
                                    rankingOrder[rankIndex].pictureUrl || default_profile
                                }
                                className="rounded-full h-20 w-20 inline-block"
                            />
                            <div className="mt-2 mb-4">
                                {rankingOrder[rankIndex].name}
                            </div>
                            <div
                                style={{
                                    height: 100 - rankIndex * 25,
                                }}
                                className={`text-4xl flex justify-center items-center rounded ${colorClasses[rankIndex]} bg-gray-100 shadow-lg`}
                            >
                                {rankIndex + 1}
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default RankingPodium;
