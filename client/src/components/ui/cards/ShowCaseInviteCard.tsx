import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillWechat } from 'react-icons/ai';
import { BsCodeSlash } from 'react-icons/bs';
import { FaLaptopCode, FaUserEdit } from 'react-icons/fa';
import { TbBulb } from 'react-icons/tb';

import { ShowCaseSection } from '../../../models/enums';
import { IExerciseWithId } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import { getShowcasePageLink } from '../../../utils/links';
import CodeEditor from '../editor/CodeEditor';
import HoveringLabel from '../labels/HoveringLabel';
import LanguageLabel from '../labels/LanguageLabel';

interface Props {
    exercise: IExerciseWithId;
    inviteMode: 'created' | 'solved';
}

const ShowCaseInviteCard: React.FC<Props> = ({ exercise, inviteMode }) => {
    const { submissionMap, userDetail } = useUserContext();

    // If the user has created the exercise, show the solution code written by this user.
    // If the user has solved the exercise, show the correct submission code written by this user.
    const userCode =
        inviteMode === 'created' ? exercise.solutionCode : submissionMap[exercise._id].code;

    // Author of th exercise.
    const author = inviteMode === 'created' ? userDetail?.name : exercise.author?.name;

    return (
        <article className="flex flex-col gap-3 px-2 lg:px-4 py-2 transition-all bg-slate-100/80 shadow hover:shadow-md rounded">
            {/* Card header that displays exercise title, language and author */}
            <header className="flex items-center gap-2">
                <h3 className="text-gray-600 text-xl hover:text-main-500 cursor-pointer">
                    <Link to={getShowcasePageLink(exercise._id)}>{exercise.name}</Link>
                </h3>
                <span className="text-sm cursor-pointer">
                    <LanguageLabel language={exercise.language} />
                </span>
                <HoveringLabel label="Creator" className="flex-start gap-1 ml-auto text-sm">
                    <FaUserEdit className="text-gray-600 text-lg" /> {author}
                </HoveringLabel>
            </header>

            {/* Card body that shows the user solution for this exercise that can be showcased. */}
            <div className="flex flex-col gap-2">
                <p className="flex items-center gap-1">
                    <BsCodeSlash className="text-lg" /> Your Solution
                </p>
                <CodeEditor
                    className="!shadow-sm !border-[1px]"
                    language={exercise.language}
                    value={userCode}
                    showHeader={false}
                    onChange={() => {}}
                    readOnly={true}
                />
            </div>

            {/* Listing showcase page links with its associated sections as query strings. */}
            <footer className="flex flex-col md:flex-row gap-2">
                <Link
                    to={getShowcasePageLink(exercise._id, ShowCaseSection.MODEL_ANSWER)}
                    className="flex-start gap-2 px-3 py-1 transition-all hover:bg-main-500/90 hover:text-white hover:shadow rounded-full"
                >
                    <TbBulb className="text-lg" />
                    Model Answer
                </Link>
                <Link
                    to={getShowcasePageLink(exercise._id, ShowCaseSection.SHOWCASES)}
                    className="flex-start gap-2 px-3 py-1 transition-all hover:bg-purple-600 hover:text-white hover:shadow rounded-full"
                >
                    <FaLaptopCode className="text-lg" />
                    User Solutions
                </Link>
                <Link
                    to={getShowcasePageLink(exercise._id, ShowCaseSection.DISCUSSIONS)}
                    className="flex-start gap-2 px-2 py-1 transition-all hover:bg-pink-600 hover:text-white hover:shadow rounded-full"
                >
                    <AiFillWechat className="text-lg" />
                    {exercise.comments.length} Discussions
                </Link>
            </footer>
        </article>
    );
};

export default ShowCaseInviteCard;
