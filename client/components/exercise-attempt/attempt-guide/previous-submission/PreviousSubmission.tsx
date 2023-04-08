import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { BsFileEarmarkCode } from 'react-icons/bs';
import { IoMdInformationCircle } from 'react-icons/io';
import { runTestCases } from '../../../../apis/submission.api';
import {
  IExerciseWithId,
  ITestOutput,
  IUserSubmission,
} from '../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { listItemAnimations } from '../../../../utils/animations.util';
import { getDateTimeFormat } from '../../../../utils/datetime.util';
import { getLanguageIcon, prettierLanguageName } from '../../../../utils/language.util';
import CodeEditor from '../../../ui/editor/CodeEditor';
import StatusLabel from '../../../ui/labels/StatusLabel';

// Component for showing user's previous submission for the currently attempted exercise.
const PreviousSubmission: React.FC = () => {
  const { userSubmission, exercise } = useExerciseAttemptCtx();

  if (!exercise) return null;

  return (
    <section className="flex-1 bg-white px-4 py-5">
      <h2 className="flex-start gap-1 text-xl text-gray-600">
        <BsFileEarmarkCode className="text-[1.1em]" /> Submission History
      </h2>
      {userSubmission && (
        <motion.div
          variants={listItemAnimations}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3 }}
        >
          <SubmissionCard userSubmission={userSubmission} exercise={exercise} />
        </motion.div>
      )}
      {!userSubmission && (
        <div className="h-[20rem] flex-center gap-1 text-lg text-gray-600">
          <IoMdInformationCircle className="text-main-400 text-[1.2em]" />
          <p>You don&apos;t have any submissions yet!</p>
        </div>
      )}
    </section>
  );
};

const SubmissionCard: React.FC<{
  userSubmission: IUserSubmission;
  exercise: IExerciseWithId;
}> = ({ userSubmission, exercise }) => {
  const [testResults, setTestResults] = useState<ITestOutput[]>([]);

  useEffect(() => {
    const getTestResults = async () => {
      const { ok, data: testResults } = await runTestCases({
        code: userSubmission.code,
        language: exercise.language,
        testCases: exercise.testCases,
      });
      if (ok && testResults) setTestResults(testResults);
    };
    getTestResults();
  }, [userSubmission, exercise]);

  const [passCount, failCount] = useMemo(() => {
    const passCount = testResults.reduce(
      (accCount, curr) => (curr.correct ? accCount + 1 : accCount),
      0,
    );
    const failCount = testResults.length - passCount;
    return [passCount, failCount];
  }, [testResults]);

  return (
    <article className="flex flex-col gap-2 mt-3 px-3 py-2 bg-gray-100/80 rounded-sm shadow-md">
      <header className="flex justify-between items-center">
        <time className="text-gray-500 font-semibold">
          Submitted At{' '}
          <span className="font-bold">
            {getDateTimeFormat(userSubmission.postedAt, false)}
          </span>
        </time>
        <StatusLabel correct={userSubmission.correct} showIcon={false} />
      </header>
      <div
        className={`flex-start py-[0.3rem] -mb-1 text-gray-600 gap-1 rounded transition-all`}
      >
        {getLanguageIcon(exercise.language, {
          width: '25px',
          height: '25px',
        })}
        {prettierLanguageName(exercise.language || '')}
      </div>
      <CodeEditor
        language={exercise.language}
        value={userSubmission.code}
        showHeader={false}
        readOnly={true}
        height="13rem"
        className="focus-within:border-main-400"
      />
      <footer className="flex gap-3 mt-1">
        <p className="text-emerald-700/90">{passCount} Tests Passed</p>
        <p className="text-rose-800/90">{failCount} Tests Failed</p>
      </footer>
    </article>
  );
};

export default PreviousSubmission;
