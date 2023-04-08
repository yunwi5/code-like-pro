import React from 'react';
import { useDispatch } from 'react-redux';
import { Difficulty, DifficultyList } from '../../../../models/enums';
import { exerciseBrowsingActions } from '../../../../store/redux/browsing-slice';
import { useAppSelector } from '../../../../store/redux/store';
import {
  getDifficultyActiveClass,
  getDifficultyBtnClass,
} from '../../../../utils/difficulty.util';

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
          const colorClass = getDifficultyBtnClass(diff);
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

export default DifficultyFilter;
