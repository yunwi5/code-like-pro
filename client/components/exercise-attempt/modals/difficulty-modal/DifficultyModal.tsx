import { FC, useEffect, useState } from 'react';
import { BsBarChartFill } from 'react-icons/bs';

import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { useUserContext } from '../../../../store/context/UserContext';
import { DifficultyTextColorMap } from '../../../../utils/colors.util';
import {
  getOverallDifficulty,
  MAX_DIFFICULTY_VALUE,
} from '../../../../utils/difficulty.util';
import AnimationModal from '../../../ui/modals/AnimationModal';
import DifficultyRatingForm from './DifficultyRatingForm';
import DifficultyVoteChart from './DifficultyVoteChart';
import RateAgain from './RateAgain';
import DifficultyAdjustmentInfo from './DifficultyAdjustmentInfo';

interface Props {
  open: boolean;
  onClose: () => void;
}

const DifficultyModal: FC<Props> = ({ open, onClose }) => {
  const { exercise } = useExerciseAttemptCtx();
  const { userDetail } = useUserContext();
  const userDifficultyVote = exercise?.difficultyVotes?.find(
    (vote) => vote.user === userDetail?._id,
  );
  const [showForm, setShowForm] = useState<boolean>(!userDifficultyVote);

  if (exercise == null) return null;

  const HandleVoteSubmit = () => setShowForm(false);

  // Difficulty votes including creator's choice
  const difficultyVotes = exercise.difficultyVotes || [];

  const { overallDifficulty, overallRatingRounded } = getOverallDifficulty(exercise);

  useEffect(() => {
    if (!!userDifficultyVote?.type) setShowForm(false);
  }, [open, userDifficultyVote?.type]);

  return (
    <AnimationModal
      open={open}
      onClose={onClose}
      className="!rounded-md w-[clamp(25rem,45rem,96vw)] overflow-hidden"
    >
      <section className="flex flex-col text-gray-700">
        <header className="px-7 py-4 shadow-md border-b-2 border-gray-200">
          <h2 className="text-2xl flex-start gap-2 capitalize">
            <BsBarChartFill className="text-main-400 text-3xl" />
            How would you rate the difficulty?
          </h2>
        </header>
        <div className="flex flex-col gap-2 px-7 pt-3 pb-6 text-slate-700 bg-slate-100">
          <div className="grid grid-cols-1 xs:grid-cols-2 text-base capitalize">
            <h3 className="flex-start items-center gap-2 text-lg">
              Overall Difficulty:{' '}
              <span
                style={{
                  color: DifficultyTextColorMap[overallDifficulty || exercise.difficulty],
                }}
                className="font-semibold"
              >
                {overallDifficulty}&nbsp;
                <span className="text-base">
                  ({overallRatingRounded} / {MAX_DIFFICULTY_VALUE})
                </span>
              </span>
              <DifficultyAdjustmentInfo exercise={exercise} />
            </h3>
          </div>

          <p>
            Our users can rate the difficulty of the challenges, so that we can derive
            more accurate measurements of difficulties for each challenge.
          </p>

          <DifficultyVoteChart difficultyVotes={difficultyVotes} />

          {showForm && (
            <DifficultyRatingForm
              exercise={exercise}
              onSubmit={HandleVoteSubmit}
              onCancel={() => setShowForm(false)}
              defaultValue={userDifficultyVote?.type}
            />
          )}
          {!showForm && (
            <RateAgain
              onRateAgain={() => setShowForm(true)}
              userDifficultyVote={userDifficultyVote}
            />
          )}

          <div className="pt-2 flex-end">
            <button
              type="button"
              className="px-3 py-2 text-lg rounded-sm bg-white hover:bg-gray-700 hover:text-white shadow-md hover:shadow-lg"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </AnimationModal>
  );
};

export default DifficultyModal;
