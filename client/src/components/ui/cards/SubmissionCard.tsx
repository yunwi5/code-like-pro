import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import { IUserSubmissionPopulated } from '../../../models/interfaces';
import { getDifficultyColorClass } from '../../../utils/difficulty';
import { getExerciseAttemptPageLink } from '../../../utils/links';
import { BsFileEarmarkCodeFill } from 'react-icons/bs';
import { getDateTimeFormat } from '../../../utils/datetime';

interface Props {
    submission: IUserSubmissionPopulated;
    className?: string;
}

const SubmissionCard: React.FC<Props> = ({ submission, className }) => {
    const navigate = useNavigate();
    const { difficulty, name, _id: exerciseId } = submission.exercise;

    // Apply different color styles for different difficulties and status.
    const difficultyClass = getDifficultyColorClass(difficulty);
    const statusClass = submission.correct ? 'text-emerald-500' : 'text-rose-500';

    // Human readable datetime format.
    const dateTimeFormat = getDateTimeFormat(submission.postedAt);

    return (
        <article
            className={`flex flex-col gap-2 px-4 py-2 text-gray-700 border-2 border-gray-200/90 transition-all rounded-sm shadow-md hover:shadow-lg cursor-pointer ${className}`}
        >
            {/* Header for submission datetime and status */}
            <header className="flex-between">
                <time className="flex-start gap-1 opacity-80 text-sm">
                    <BsFileEarmarkCodeFill className="text-lg text-gray-500" />{' '}
                    {dateTimeFormat}
                </time>
                <p className={`flex-start gap-2 ${statusClass}`}>
                    <div className="flex-center w-[1.65rem] h-[1.65rem] rounded-full shadow-md bg-white">
                        {submission.correct ? <FiCheck size={23} /> : <IoMdClose size={23} />}
                    </div>
                    {submission.correct ? 'Correct' : 'Incorrect'}
                </p>
            </header>

            {/* Submission exercise title and difficulty info */}
            <div className="flex-start gap-3">
                <h3
                    className="ext-base sm:text-[1.13rem] hover:text-blue-600"
                    onClick={() => navigate(getExerciseAttemptPageLink(exerciseId))}
                >
                    {name}
                </h3>
                <div
                    className={`flex-center px-[0.4rem] py-[1.5px] sm:py-[2px] text-[0.8rem] sm:text-sm rounded-md ${difficultyClass}`}
                >
                    {difficulty}
                </div>
            </div>
        </article>
    );
};

export default SubmissionCard;
