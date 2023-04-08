import React from 'react';
import { MdReportProblem } from 'react-icons/md';
import { AiFillStar, AiFillCheckCircle } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';

import { IExerciseWithId } from '../../../models/interfaces';
import useExerciseSubmissionsQuery from '../../../hooks/exercise/exercise-submissions.tsx/useExerciseSubmissionsQuery';
import { getSubmissionStats } from '../../../utils/user-submission.util';
import { getDateFormat } from '../../../utils/datetime.util';
import ProfileView from '../user/profile-view/ProfileView';

// Listing exercise specs such as topic, favorite count, correct rate, and issue reports.
const ExerciseSpec: React.FC<{ exercise: IExerciseWithId }> = ({ exercise }) => {
  const { submissions } = useExerciseSubmissionsQuery(exercise?._id || '');
  const { correctRate, correctCount, total } = getSubmissionStats(submissions || []);

  return (
    <ul className="text-sm md:text-[0.95rem] mt-4 lg:mt-2 flex flex-wrap gap-x-4 gap-y-2">
      {exercise.author && (
        <ProfileView user={exercise.author} size={'1.5rem'} className="!gap-2" />
      )}
      <li className="flex items-center gap-1">
        <AiFillStar className="text-yellow-500 text-[1.4rem]" /> {exercise.liked.length}
      </li>
      <li className="flex items-center gap-1">
        <AiFillCheckCircle className="text-emerald-400 text-[1.4rem]" />
        {correctCount} of {total} ({correctRate}%)
      </li>
      <li className="flex items-center gap-1">
        <BsClock className="text-blue-500/80 text-[1.3rem]" />{' '}
        {getDateFormat(exercise.createdAt)}
      </li>
      <li className="flex items-center gap-1">
        <MdReportProblem className="text-stone-500 text-[1.35rem]" />{' '}
        {exercise.reports.length} report{exercise.reports.length !== 1 && 's'}
      </li>
    </ul>
  );
};

export default ExerciseSpec;
