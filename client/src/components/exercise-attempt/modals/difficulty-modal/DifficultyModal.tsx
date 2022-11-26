import { FC, useEffect, useState } from 'react';
import { BsBarChartFill } from 'react-icons/bs';

import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { useUserContext } from '../../../../store/context/UserContext';
import { DifficultyTextColorMap } from '../../../../utils/colors';
import { DifficultyList } from '../../../../models/enums';
import {
    appendCreatorsDifficultyChoice,
    getDifficultyByUserRatings,
} from '../../../../utils/difficulty';
import AnimationModal from '../../../ui/modals/AnimationModal';
import DifficultyRatingForm from './DifficultyRatingForm';
import DifficultyVoteChart from './DifficultyVoteChart';
import RateAgain from './RateAgain';

const MAX_DIFFICULTY_VALUE = DifficultyList.length;

interface Props {
    open: boolean;
    onClose: () => void;
}

const DifficultyModal: FC<Props> = ({ open, onClose }) => {
    const { exercise, refetchExercise } = useExerciseAttemptCtx();
    const { userDetail } = useUserContext();
    const userDifficultyVote = exercise?.difficultyVotes?.find(
        (vote) => vote.user === userDetail?._id,
    );
    const [showForm, setShowForm] = useState<boolean>(!userDifficultyVote);

    if (exercise == null) return null;

    const HandleVoteSubmit = () => {
        refetchExercise();
        setShowForm(false);
    };

    // Difficulty votes including creator's choice
    const difficultyVotes = appendCreatorsDifficultyChoice(exercise);

    const { averageDifficulty, averageRating } = getDifficultyByUserRatings(exercise);

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
                        <h3 className="flex-start gap-2 text-lg">
                            Average Difficulty:{' '}
                            <span
                                style={{
                                    color: DifficultyTextColorMap[
                                        averageDifficulty || exercise.difficulty
                                    ],
                                }}
                                className="font-semibold"
                            >
                                {averageDifficulty}&nbsp;
                                <span className="text-base">
                                    ({averageRating} / {MAX_DIFFICULTY_VALUE})
                                </span>
                            </span>
                        </h3>

                        {/* <h3 className="flex-end gap-2">
                            Creator's Difficulty:{' '}
                            <span
                                style={{
                                    color: DifficultyTextColorMap[exercise.difficulty],
                                }}
                                className="font-semibold"
                            >
                                {averageDifficulty}&nbsp;
                                <span className="text-base">
                                    ({mapDifficultyToNumericValue(exercise.difficulty)} /{' '}
                                    {MAX_DIFFICULTY_VALUE})
                                </span>
                            </span>
                        </h3> */}
                    </div>

                    <p>
                        Our users can rate the difficulty of the challenges, so that we
                        can derive more accurate measurements of difficulties for each
                        challenge.
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
