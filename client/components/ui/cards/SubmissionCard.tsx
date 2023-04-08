import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import { IUserSubmissionPopulated } from '../../../models/interfaces';
import { getDifficultyBtnClass } from '../../../utils/difficulty.util';
import { getExerciseAttemptPageLink } from '../../../utils/links.util';
import { BsFileEarmarkCodeFill } from 'react-icons/bs';
import { getDateTimeFormat } from '../../../utils/datetime.util';
import StatusLabel from '../labels/StatusLabel';
import { useRouter } from 'next/navigation';

interface Props {
  submission: IUserSubmissionPopulated;
  className?: string;
}

const SubmissionCard: React.FC<Props> = ({ submission, className }) => {
  const router = useRouter();
  const { difficulty, name, _id: exerciseId } = submission.exercise;

  // Apply different color styles for different difficulties.
  const difficultyClass = getDifficultyBtnClass(difficulty);

  // Human readable datetime format.
  const dateTimeFormat = getDateTimeFormat(submission.postedAt);

  return (
    <article
      className={`flex flex-col gap-2 px-4 py-2 text-gray-700 border-2 border-gray-200/90 transition-all rounded-sm shadow-md hover:shadow-lg cursor-pointer ${className}`}
      onClick={() => router.push(getExerciseAttemptPageLink(exerciseId))}
    >
      {/* Header for submission datetime and status */}
      <header className="flex-between">
        <time className="flex-start gap-1 opacity-80 text-sm">
          <BsFileEarmarkCodeFill className="text-lg text-gray-500" /> {dateTimeFormat}
        </time>
        <StatusLabel correct={submission.correct} />
      </header>

      {/* Submission exercise title and difficulty info */}
      <div className="flex-start gap-3">
        <h3 className="ext-base sm:text-[1.13rem] hover:text-blue-600">{name}</h3>
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
