import React from 'react';
import { MdReportProblem, MdCategory } from 'react-icons/md';
import { AiFillStar, AiFillCheckCircle } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';

import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { getDifficultyColorClass } from '../../../../../utils/difficulty';
import StatusLabel from '../../../../ui/labels/StatusLabel';

const ExercisePromptHeader: React.FC = () => {
    const { exercise, userSubmission } = useExerciseAttemptCtx();

    if (exercise == null) return null;

    const colorClass = getDifficultyColorClass(exercise.difficulty);

    console.log('userSubmission:', userSubmission);

    return (
        <header>
            <div className="flex-between">
                <h2 className="flex-start flex-wrap gap-3 text-xl md:text-2xl lg:text-3xl capitalize">
                    {exercise.name}
                    {userSubmission && <StatusLabel correct={userSubmission.correct} />}
                </h2>
                <label
                    className={`px-3 py-1 text-sm md:text-base lg:text-lg xl:text-xl border-2 ${colorClass} rounded-lg`}
                >
                    {exercise.difficulty}
                </label>
            </div>
            <ul className="text-sm md:text-[0.95rem] mt-4 lg:mt-2 flex flex-wrap gap-x-4 gap-y-2">
                <li className="flex gap-1">
                    <FaUserEdit className="text-gray-600 text-[1.35rem]" />{' '}
                    {exercise.author?.name || 'Anonymous'}
                </li>
                <li className="flex gap-1">
                    <MdCategory className="text-sky-500 text-[1.4rem]" /> {exercise.topic}
                </li>
                <li className="flex gap-1">
                    <AiFillStar className="text-yellow-500 text-[1.35rem]" />{' '}
                    {exercise.liked.length}
                </li>
                <li className="flex gap-1">
                    <AiFillCheckCircle className="text-emerald-400 text-[1.45rem]" />
                    38,239 of 60,329 (63%)
                </li>
                <li className="flex gap-1">
                    <MdReportProblem className="text-stone-500 text-[1.35rem]" />{' '}
                    {exercise.reports.length} report(s)
                </li>
            </ul>
        </header>
    );
};

export default ExercisePromptHeader;
