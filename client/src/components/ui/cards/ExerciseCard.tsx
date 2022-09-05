import React from 'react';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdOutlineEdit, MdReportProblem } from 'react-icons/md';
import { BsFillTagsFill } from 'react-icons/bs';

import { IExerciseCard } from '../../../models/interfaces';
import { getDifficultyColorClass } from '../../../utils/difficulty';
import { getLanguageIcon, mapJobeLangCodeToAppLanguage } from '../../../utils/language';
import { Link, useNavigate } from 'react-router-dom';
import { getExerciseAttemptPageLink, getExerciseEditLink } from '../../../utils/links';
import HoveringLabel from '../labels/HoveringLabel';
import styles from './ExerciseCard.module.scss';
import { useUserContext } from '../../../store/context/UserContext';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface Props {
    exercise: IExerciseCard;
    className?: string;
}

const ExerciseCard: React.FC<Props> = ({ exercise, className = '' }) => {
    const { likedExerciseIdSet } = useUserContext();

    // Check if the exercise is liked by the user.
    const liked: boolean = likedExerciseIdSet.has(exercise?._id || '');

    const navigate = useNavigate();
    const difficultyStyle = getDifficultyColorClass(exercise.difficulty);

    return (
        <article
            className={`card flex flex-col gap-4 px-4 py-2 text-gray-700 border-2 border-gray-200/90 cursor-pointer hover:bg-blue-500/30 ${className} ${styles.card}`}
        >
            {/* Exercise name, difficulty and language */}
            <header className="flex-start gap-3">
                <h3
                    className="text-base sm:text-[1.13rem] hover:text-blue-600"
                    onClick={() => navigate(getExerciseAttemptPageLink(exercise._id))}
                >
                    {exercise.name}
                </h3>
                <div
                    className={`flex-center px-[0.4rem] py-[1.5px] sm:py-[2px] text-[0.8rem] sm:text-sm rounded-md ${difficultyStyle}`}
                >
                    {exercise.difficulty}
                </div>
                {liked && (
                    <HoveringLabel label={'Favorited'}>
                        <AiFillStar className="text-yellow-500/70 text-2xl" />
                    </HoveringLabel>
                )}
                <HoveringLabel
                    label={mapJobeLangCodeToAppLanguage(exercise.language)}
                    className="ml-auto"
                >
                    {getLanguageIcon(exercise.language, { width: '30px', height: '30px' })}
                </HoveringLabel>
            </header>

            {/* Exercise Info */}
            <ul className="flex-start flex-wrap gap-2 text-[0.82rem] sm:text-sm">
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

            <div className="flex-between">
                {/* Tags List. Tags will only be shown on the card for 640px screen size or above. */}
                {/* On the mobile screen size, rendering tag list makes it look worse. */}
                <ul className="hidden sm:flex-start flex-wrap gap-2 text-[0.85rem]">
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

                {/* If the user is authorized (either creator or admin), give edit and delete accesses */}
                {exercise?.isAuthorized && (
                    <div className="flex-start gap-1">
                        <Link
                            to={getExerciseEditLink(exercise._id)}
                            className="px-1 py-1 transition-all rounded-md text-sky-500 hover:bg-sky-500 hover:text-white"
                        >
                            <MdOutlineEdit className=" text-2xl" />
                        </Link>
                        <div className="px-1 py-1 transition-all rounded-md text-rose-500 hover:bg-rose-500 hover:text-white">
                            <RiDeleteBin6Line className="text-2xl" />
                        </div>
                    </div>
                )}
            </div>

            {/* Link to exercise attempt page for this exercise */}
            {!exercise?.isAuthorized && (
                <Link
                    className={`${styles.btn} btn btn-fill`}
                    to={getExerciseAttemptPageLink(exercise._id)}
                >
                    Try This!
                </Link>
            )}
        </article>
    );
};

export default ExerciseCard;
