import React from 'react';
import { MdReportProblem } from 'react-icons/md';
import { AiFillStar, AiFillCheckCircle } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';

import { IExerciseWithId } from '../../models/interfaces';
import useExerciseSubmissionsQuery from '../../hooks/exercise-queries/useExerciseSubmissionsQuery';
import { getSubmissionStats } from '../../utils/user-submission';
import { getDateFormat } from '../../utils/datetime';

// Listing exercise specs such as topic, favorite count, correct rate, and issue reports.
const ExerciseSpec: React.FC<{ exercise: IExerciseWithId }> = ({ exercise }) => {
    const { submissions } = useExerciseSubmissionsQuery(exercise?._id || '');
    const { correctRate, correctCount, total } = getSubmissionStats(submissions || []);

    return (
        <ul className="text-sm md:text-[0.95rem] mt-4 lg:mt-2 flex flex-wrap gap-x-4 gap-y-2">
            <li className="flex gap-1">
                <FaUserEdit className="text-gray-600 text-[1.35rem]" />{' '}
                {exercise.author?.name || 'Anonymous'}
            </li>
            <li className="flex gap-1">
                <AiFillStar className="text-yellow-500 text-[1.4rem]" />{' '}
                {exercise.liked.length}
            </li>
            <li className="flex gap-1">
                <AiFillCheckCircle className="text-emerald-400 text-[1.4rem]" />
                {correctCount} of {total} ({correctRate}%)
            </li>
            <li className="flex gap-1">
                <BsFillCalendarCheckFill className="text-blue-500/80 text-[1.15rem]" />{' '}
                {getDateFormat(exercise.createdAt)}
            </li>
            <li className="flex gap-1">
                <MdReportProblem className="text-stone-500 text-[1.35rem]" />{' '}
                {exercise.reports.length} report(s)
            </li>
        </ul>
    );
};

export default ExerciseSpec;
