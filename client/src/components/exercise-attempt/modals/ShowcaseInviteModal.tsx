import React from 'react';
import { MdCelebration } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import AnimationModal from '../../ui/modals/AnimationModal';

interface Props {
    open: boolean;
    onClose: () => void;
}

const ShowcaseInviteModal: React.FC<Props> = ({ open, onClose }) => {
    const { exercise } = useExerciseAttemptCtx();
    const exerciseId = exercise?._id;

    const exerciseNameHighlight = (
        <strong className="text-main-500 font-semibold capitalize">
            {exercise?.name}
        </strong>
    );

    return (
        <AnimationModal
            open={open}
            onClose={onClose}
            className="!rounded-md min-w-[min(20rem,92.5vw)] max-w-[32rem] overflow-hidden"
        >
            <section className="flex flex-col text-gray-700">
                <header className="px-7 py-4 shadow-md border-b-2 border-gray-200">
                    <h2 className="text-2xl flex-start gap-2">
                        <MdCelebration className="text-main-400 text-3xl" />
                        You Got It! Join Our Showcase!
                    </h2>
                </header>
                <div className="flex flex-col gap-2 px-7 py-6 text-slate-700 bg-slate-200/90">
                    <p>You got the exercise {exerciseNameHighlight} correct!</p>
                    <p>
                        Please consider join our showcase page for {exerciseNameHighlight}{' '}
                        to showcase your work!
                    </p>

                    {/* Action buttons for moving to showcase page or closing modal */}
                    <div className="pt-2 flex-between">
                        <Link
                            to={`/showcase/${exerciseId}`}
                            className={
                                'px-3 py-2 text-lg rounded-sm bg-gray-700 hover:bg-gray-800 text-white shadow-md'
                            }
                        >
                            ShowCase
                        </Link>
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

export default ShowcaseInviteModal;
