import React from 'react';
import { DifficultyList } from '../../../../models/enums';
import { getDifficultyColorClass } from '../../../../utils/difficulty';

const DifficultyFilter: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Difficulty</p>
            <ul className="flex gap-2">
                {DifficultyList.map((diff) => (
                    <li
                        className={`px-2 py-1 rounded-md cursor-pointer ${getDifficultyColorClass(
                            diff,
                        )}`}
                    >
                        {diff}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DifficultyFilter;
