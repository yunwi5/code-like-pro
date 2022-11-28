import React, { FC, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

import { postExerciseDifficultyVote } from '../../../../apis/exercise.api';
import { Difficulty, DifficultyList } from '../../../../models/enums';
import { IExerciseWithId } from '../../../../models/interfaces';
import { useUserContext } from '../../../../store/context/UserContext';
import {
    getDifficultyActiveClass,
    getDifficultyBtnClass,
} from '../../../../utils/difficulty';
import { toastNotify } from '../../../../utils/notification';
import Button from '../../../ui/buttons/Button';
import CancelButton from '../../../ui/buttons/CancelButton';

type Props = {
    exercise: IExerciseWithId;
    onSubmit: () => void;
    onCancel: () => void;
    defaultValue?: Difficulty;
};

const DifficultyRatingForm: FC<Props> = ({
    exercise,
    onSubmit,
    onCancel,
    defaultValue,
}) => {
    const { userDetail } = useUserContext();
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(
        defaultValue ?? null,
    );
    const [loading, setLoading] = useState(false);

    const handleDifficultySelect = (difficulty: Difficulty) => {
        setSelectedDifficulty((prevDiff) =>
            prevDiff === difficulty ? null : difficulty,
        );
    };

    const handleSubmitVote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDifficulty || !userDetail) return;

        setLoading(true);
        const { ok, message } = await postExerciseDifficultyVote(
            exercise._id,
            selectedDifficulty,
        );
        setLoading(false);
        if (ok) {
            toastNotify('Rating submitted!', 'success');
            onSubmit();
        } else {
            toastNotify(`Error: ${message}`, 'error');
        }
    };

    return (
        <form
            onSubmit={handleSubmitVote}
            className="mt-5 pb-3 flex flex-wrap gap-y-3 justify-between"
        >
            <label className="mr-8 text-gray-600 font-semibold">
                <FiStar className="inline-block mr-1 text-[1.2em] text-main-500" />
                Rate the difficulty of{' '}
                <mark className="mark text-main-400">{exercise.name}</mark>
            </label>

            <div className="flex gap-2">
                {DifficultyList.map((difficulty) => (
                    <button
                        key={difficulty}
                        type="button"
                        className={`px-2 py-1 rounded-md ${getDifficultyBtnClass(
                            difficulty,
                        )} ${
                            selectedDifficulty === difficulty
                                ? getDifficultyActiveClass(difficulty)
                                : ''
                        }`}
                        onClick={() => handleDifficultySelect(difficulty)}
                    >
                        {difficulty}
                    </button>
                ))}
            </div>

            {selectedDifficulty && (
                <div className="flex-end gap-1 basis-full">
                    <CancelButton onCancel={onCancel} />
                    {loading ? (
                        <ClipLoader size={35} color="#5552e4" />
                    ) : (
                        <Button size="small" className="!py-1">
                            Submit Rating
                        </Button>
                    )}
                </div>
            )}
        </form>
    );
};

export default DifficultyRatingForm;
