import React from 'react';
import { IExerciseWithId } from '../../../models/interfaces';
import RoundButton from '../../ui/buttons/RoundButton';

interface Props {
  showCreatedExercises: boolean;
  setShowCreatedExercises: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExercises: IExerciseWithId[];
}

// Showcase list options bar where users can select showcases for exercises they created or solved.
const ShowcaseListOptions: React.FC<Props> = (props) => {
  const { showCreatedExercises, setShowCreatedExercises, selectedExercises } = props;

  return (
    <div className="mt-3 md:mb-3 flex flex-wrap justify-center sm:justify-between items-center gap-x-3 gap-y-5">
      <div className="flex gap-3">
        <RoundButton
          onClick={() => setShowCreatedExercises(true)}
          className="!text-base !shadow-md hover:shadow-lg"
          theme={showCreatedExercises ? 'dark' : 'light'}
        >
          Created Ones
        </RoundButton>
        <RoundButton
          onClick={() => setShowCreatedExercises(false)}
          className="!text-base !shadow-md hover:shadow-lg"
          theme={!showCreatedExercises ? 'dark' : 'light'}
        >
          Solved Ones
        </RoundButton>
      </div>
      <h3 className="text-lg sm:text-xl text-gray-500 font-semibold">
        {selectedExercises.length}
        &nbsp;{showCreatedExercises ? 'Created' : 'Solved'}
        &nbsp;Challenges
      </h3>
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
