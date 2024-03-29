import React from 'react';
import { AiFillWechat } from 'react-icons/ai';
import { BsCodeSlash } from 'react-icons/bs';
import { FaLaptopCode, FaUserEdit } from 'react-icons/fa';
import { TbBulb } from 'react-icons/tb';
import Link from 'next/link';

import { ShowCaseSection } from '../../../models/enums';
import { IExerciseWithId } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import { getShowcasePageLink } from '../../../utils/links.util';
import CodeEditor from '../editor/code-editor/CodeEditor';
import LanguageLabel from '../icons/LanguageIcon';
import HoveringLabel from '../tooltip/HoveringLabel';

interface Props {
  exercise: IExerciseWithId;
  inviteMode: 'created' | 'solved';
  className?: string;
}

const ShowCaseInviteCard: React.FC<Props> = ({ exercise, inviteMode, className = '' }) => {
  const { submissionMap, userDetail } = useUserContext();

  const userCode =
    inviteMode === 'created' ? exercise.solutionCode : submissionMap[exercise._id].code;

  const author = inviteMode === 'created' ? userDetail?.name : exercise.author?.name;

  return (
    <article
      className={`flex flex-col gap-3 px-2 lg:px-4 py-2 transition-all border-2 border-slate-300/90 shadow hover:shadow-md rounded ${className}`}
    >
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="text-gray-600 text-lg sm:text-xl hover:text-main-500 cursor-pointer">
          <Link href={getShowcasePageLink(exercise._id)}>{exercise.name}</Link>
        </h3>
        <span className="text-sm cursor-pointer">
          <LanguageLabel language={exercise.language} />
        </span>
        <HoveringLabel label="Creator" className="flex-start gap-1 xs:ml-auto text-sm">
          <FaUserEdit className="text-gray-600 text-lg" /> {author}
        </HoveringLabel>
      </header>

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

      <footer className="flex flex-col md:flex-row gap-2">
        <Link
          href={getShowcasePageLink(exercise._id, ShowCaseSection.MODEL_ANSWER)}
          className="flex-start gap-2 px-3 py-1 transition-all hover:bg-main-500/90 hover:text-white hover:shadow rounded-full"
        >
          <TbBulb className="text-lg" />
          Model Answer
        </Link>
        <Link
          href={getShowcasePageLink(exercise._id, ShowCaseSection.SHOWCASES)}
          className="flex-start gap-2 px-3 py-1 transition-all hover:bg-purple-600 hover:text-white hover:shadow rounded-full"
        >
          <FaLaptopCode className="text-lg" />
          {exercise.showCases?.length || 0} User Solution
          {(exercise.showCases?.length || 0) !== 1 && 's'}
        </Link>
        <Link
          href={getShowcasePageLink(exercise._id, ShowCaseSection.DISCUSSIONS)}
          className="flex-start gap-2 px-2 py-1 transition-all hover:bg-pink-600 hover:text-white hover:shadow rounded-full"
        >
          <AiFillWechat className="text-lg" />
          {exercise.comments?.length} Discussion
          {(exercise.comments?.length || 0) !== 1 && 's'}
        </Link>
      </footer>
    </article>
  );
};

export default ShowCaseInviteCard;
