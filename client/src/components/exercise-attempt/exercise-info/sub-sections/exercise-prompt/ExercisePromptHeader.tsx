import React from 'react';
import { MdReportProblem, MdCategory } from 'react-icons/md';
import { AiFillStar, AiFillCheckCircle } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { Difficulty } from '../../../../../models/enums';

const ExercisePromptHeader: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();

    if (exercise == null) return null;

    const colorClass = getDifficultyColorClass(exercise.difficulty);

    return (
        <header>
            <div className="flex-between">
                <h2 className="text-2xl lg:text-3xl capitalize">{exercise.name}</h2>
                <label
                    className={`px-3 py-1 text-base lg:text-lg xl:text-xl border-2 ${colorClass} rounded-lg`}
                >
                    {exercise.difficulty}
                </label>
            </div>
            <ul className="text-[0.95rem] mt-4 lg:mt-2 flex flex-wrap gap-x-4 gap-y-2">
                <li className="flex gap-1">
                    <FaUserEdit className="text-main-500 text-[1.35rem]" /> Martin
                </li>
                <li className="flex gap-1">
                    <MdCategory className="text-sky-500 text-[1.4rem]" /> {exercise.topic}
                </li>
                <li className="flex gap-1">
                    <AiFillStar className="text-yellow-500 text-[1.35rem]" /> 12,530
                </li>
                <li className="flex gap-1">
                    <AiFillCheckCircle className="text-emerald-400 text-[1.45rem]" />
                    38,239 of 60,329 (63%)
                </li>
                <li className="flex gap-1">
                    <MdReportProblem className="text-rose-500 text-[1.35rem]" /> 5 reports
                </li>
            </ul>
        </header>
    );
};

// Show different color for different difficulties.
function getDifficultyColorClass(difficulty: Difficulty) {
    switch (difficulty) {
        case Difficulty.EASY:
            return 'text-emerald-400 border-emerald-400 hover:text-emerald-50 hover:bg-emerald-400';
        case Difficulty.MEDIUM:
            return 'text-sky-400 border-sky-400 hover:text-sky-50 hover:bg-sky-400';
        case Difficulty.HARD:
            return 'text-rose-400 border-rose-400 hover:text-rose-50 hover:bg-rose-400';
        case Difficulty.EXPERT:
            return 'text-stone-500 border-stone-500 hover:text-stone-50 hover:bg-stone-500';
        default:
            return 'text-main-400 border-main-400 hover:text-main-50 hover:bg-main-400';
    }
}

export default ExercisePromptHeader;
