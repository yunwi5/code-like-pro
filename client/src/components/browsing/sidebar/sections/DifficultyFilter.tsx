import React from 'react';
import { useDispatch } from 'react-redux';
import { Difficulty, DifficultyList } from '../../../../models/enums';
import { exerciseBrowsingActions } from '../../../../store/redux/browsing-slice';
import { useAppSelector } from '../../../../store/redux/store';
import { getDifficultyColorClass } from '../../../../utils/difficulty';

const DifficultyFilter: React.FC = () => {
    const { difficulties } = useAppSelector((state) => state.browsing.filtering);
    const dispatch = useDispatch();

    const handleDifficultyToggle = (dif: Difficulty) => {
        dispatch(exerciseBrowsingActions.toggleDifficulties(dif));
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Difficulty</p>
            <ul className="flex gap-2">
                {DifficultyList.map((diff) => {
                    const colorClass = getDifficultyColorClass(diff);
                    const activeClass = difficulties.includes(diff)
                        ? getDifficultyActiveClass(diff)
                        : '';

                    return (
                        <li
                            key={diff}
                            onClick={() => handleDifficultyToggle(diff)}
                            className={`px-2 py-1 rounded-md cursor-pointer ${colorClass} ${activeClass}`}
                        >
                            {diff}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// When the difficulty filter is active, apply these active classes for each difficulty for different styles than non-active classes.
function getDifficultyActiveClass(difficulty: Difficulty) {
    switch (difficulty) {
        case Difficulty.EASY:
            return '!text-emerald-50 !bg-emerald-400';
        case Difficulty.MEDIUM:
            return '!text-sky-50 !bg-sky-400';
        case Difficulty.HARD:
            return '!text-rose-50 !bg-rose-400';
        case Difficulty.EXPERT:
            return '!text-stone-50 !bg-stone-500';
    }
}

export default DifficultyFilter;
