import Link from 'next/link';
import { FC, useState } from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { GoGitMerge } from 'react-icons/go';
import { MdCelebration } from 'react-icons/md';

import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import { getShowcasePageLink } from '../../../utils/links.util';
import AnimationModal from '../../ui/modals/AnimationModal';
import TestCasesMergeModal from './merge-modal/TestCasesMergeModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const styles = {
  sectionHeading: 'flex-start gap-1 text-lg font-semibold',
  btn: 'w-fit ml-7 px-3 py-[0.35rem] font-semibold rounded-sm text-main-500 hover:bg-white hover:shadow-md transition-all',
};

const AttemptSuccessModal: FC<Props> = ({ open, onClose }) => {
  const { exercise } = useExerciseAttemptCtx();
  const exerciseId = exercise?._id || '';

  const [showMergeModal, setShowMergeModal] = useState(false);

  return (
    <AnimationModal
      open={open}
      onClose={onClose}
      className="!rounded-md w-[clamp(25rem,45rem,96vw)] overflow-hidden"
    >
      <section className="flex flex-col text-gray-700">
        <header className="px-7 py-4 shadow-md border-b-2 border-gray-200">
          <h2 className="text-2xl flex-start gap-2">
            <MdCelebration className="text-main-400 text-3xl" />
            Congrats, You Got It Right!
          </h2>
        </header>
        <div className="flex flex-col gap-2 px-7 pt-3 pb-6 text-slate-700 bg-slate-200/90">
          <h3 className="text-xl font-semibold">Here&apos;s what you can do next</h3>

          <div className="flex flex-col gap-1">
            <h4 className={styles.sectionHeading}>
              <GoGitMerge className="text-main-400 text-[1.2em]" />
              Merge your custom test cases
            </h4>
            <ul className="mt-1 ml-10 list-disc">
              <li>
                You can merge your own tests you created while attempting the challenge.
              </li>
            </ul>
            <button onClick={() => setShowMergeModal(true)} className={styles.btn}>
              Merge Custom Tests
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h4 className={styles.sectionHeading}>
              <FaLaptopCode className="text-main-400 text-[1.2em]" />
              Join the showcase event
            </h4>
            <ul className="ml-10 list-disc">
              <li>
                You can join the showcase for the challenge{' '}
                <span className="text-main-500 capitalize">{exercise?.name}</span>.
              </li>
              <li>
                You can view the model answer from the creator, showcase your own
                solution, view the solutions from other users.
              </li>
              <li>
                You can upvote or downvote the solutions, and and also make comments on
                the challenge.
              </li>
            </ul>
            <Link href={getShowcasePageLink(exerciseId)} className={styles.btn}>
              Join Showcase
            </Link>
          </div>

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

        {/* Modal for adding user tests to existing tests */}
        <TestCasesMergeModal
          open={showMergeModal}
          onClose={() => setShowMergeModal(false)}
        />
      </section>
    </AnimationModal>
  );
};

export default AttemptSuccessModal;
