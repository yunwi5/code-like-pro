import React from 'react';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { BsFillTagsFill } from 'react-icons/bs';

import { IExerciseCard } from '../../../models/interfaces';
import { getDifficultyColorClass } from '../../../utils/difficulty';
import { getLanguageIcon } from '../../../utils/language';
import { Link } from 'react-router-dom';
import { getExerciseAttemptPageLink } from '../../../utils/links';
import HoveringLabel from '../labels/HoveringLabel';
import styles from './ExerciseCard.module.scss';

interface Props {
    exercise: IExerciseCard;
    className?: string;
}

const ExerciseCard: React.FC<Props> = ({ exercise, className = '' }) => {
    const difficultyStyle = getDifficultyColorClass(exercise.difficulty);
    return (
        <article
            className={`card flex flex-col gap-4 px-4 py-2 text-gray-700 border-2 border-gray-200/90 cursor-pointer hover:bg-blue-500/30 ${className} ${styles.card}`}
        >
            {/* Exercise name, difficulty and language */}
            <header className="flex-start gap-3">
                <h3 className="text-[1.13rem]">{exercise.name}</h3>
                <div
                    className={`flex-center px-[0.4rem] py-[2px] text-sm rounded-md ${difficultyStyle}`}
                >
                    {exercise.difficulty}
                </div>
                <HoveringLabel label={exercise.language} className="ml-auto">
                    {getLanguageIcon(exercise.language, { width: '30px', height: '30px' })}
                </HoveringLabel>
            </header>

            {/* Exercise Info */}
            <ul className="flex-start gap-2 text-sm">
                <li className="flex-start gap-1">
                    <FaUser className="text-gray-600 text-base" />{' '}
                    {exercise.author?.name || 'Anonymous'}
                </li>
                <li className="flex-start gap-1">
                    <AiFillStar className="text-yellow-500/80 text-base" /> {exercise.stars}
                </li>
                <li className="flex-start gap-1">
                    <AiFillCheckCircle className="text-emerald-400/80 text-base" />
                    {exercise.correctRate}%
                </li>
                <li className="flex-start gap-1">
                    <MdReportProblem className="text-stone-500/80 text-base" />{' '}
                    {exercise.reports} Reports
                </li>
            </ul>

            {/* Tags */}
            <ul className="flex-start flex-wrap gap-2 text-[0.85rem]">
                <BsFillTagsFill className="text-lg text-slate-500" />

                {/* Display maximum 5 tags. Fist 5 tags in this case. */}
                {exercise.tags.slice(0, 5).map((tag, idx) => (
                    <li
                        key={idx}
                        className="px-2 py-[0.125rem] bg-gray-400/40 hover:bg-gray-600/90 hover:text-gray-50 rounded-sm"
                    >
                        # {tag}
                    </li>
                ))}
            </ul>

            {/* Link to exercise attempt page for this exercise */}
            <Link
                className={`${styles.btn} btn btn-fill`}
                to={getExerciseAttemptPageLink(exercise._id)}
            >
                Try This!
            </Link>
        </article>
    );
};

export default ExerciseCard;
