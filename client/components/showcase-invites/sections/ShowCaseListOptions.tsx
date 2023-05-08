import React from 'react';

import { IExerciseWithId } from '../../../models/interfaces';
import RoundButton from '../../ui/buttons/RoundButton';

interface Props {
  showCreatedExercises: boolean;
  setShowCreatedExercises: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExercises: IExerciseWithId[];
}

// Mobile breakpoint: 640px
const ShowcaseListOptions: React.FC<Props> = (props) => {
  const { showCreatedExercises, setShowCreatedExercises, selectedExercises } = props;

  const showExercisesCount = selectedExercises.length > 0;

  return (
    <div className="mt-3 -mb-2 md:mb-3 px-1 xs:px-3 sm:px-1 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-x-3 gap-y-5">
      <div className="self-stretch sm:self-auto flex gap-3">
        <RoundButton
          onClick={() => setShowCreatedExercises(true)}
          className="grow sm:grow-0 !text-base !shadow-md hover:shadow-lg"
          theme={showCreatedExercises ? 'dark' : 'light'}
        >
          Created Ones
        </RoundButton>
        <RoundButton
          onClick={() => setShowCreatedExercises(false)}
          className="grow sm:grow-0 !text-base !shadow-md hover:shadow-lg"
          theme={!showCreatedExercises ? 'dark' : 'light'}
        >
          Solved Ones
        </RoundButton>
      </div>
      {showExercisesCount && (
        <h3 className="self-stretch sm:self-auto text-lg sm:text-xl text-gray-500 font-semibold">
          {selectedExercises.length}
          &nbsp;{showCreatedExercises ? 'Created' : 'Solved'}
          &nbsp;Challenges
        </h3>
      )}
    </div>
  );
};

export default React.memo(ShowcaseListOptions, (prevProps, nextProps) => {
  // return false if we want to re-render
  // If showCreatedExercises prop changes, re-render
  if (prevProps.showCreatedExercises !== nextProps.showCreatedExercises) return false;
  // If selectedExercises prop changes, re-render
  if (prevProps.selectedExercises !== nextProps.selectedExercises) return false;
  return true;
});
