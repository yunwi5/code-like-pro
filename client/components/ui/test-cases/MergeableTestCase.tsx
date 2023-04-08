import { FC, useMemo } from 'react';

import {
  IExerciseWithId,
  ITestCaseProps,
  ITestCaseWithOutput,
} from '../../../models/interfaces';
import useCustomTests from '../../exercise-attempt/hooks/useCustomTests';
import { checkTestCaseMergeable } from '../../../utils/exercise-utils/testcase';
import TestCase from './TestCase';

const MergeableTestCaseStyle = {
  labelBtn: 'mr-auto ml-2 px-3 py-1 text-sm text-white rounded-full shadow',
};

const MergeableTestCase: FC<{
  exercise: IExerciseWithId;
  testCase: ITestCaseWithOutput;
  index: number;
}> = ({ exercise, testCase, index }) => {
  const { updateCustomTest, deleteCustomTest } = useCustomTests();

  const { mergeable, message } = useMemo(
    () => checkTestCaseMergeable(exercise.testCases, testCase, exercise.language),
    [exercise, testCase],
  );

  const label = useMemo(
    () =>
      mergeable ? (
        <label
          className={`${MergeableTestCaseStyle.labelBtn} bg-emerald-500 hover:bg-emerald-600`}
        >
          Mergeable
        </label>
      ) : (
        <label
          className={`${MergeableTestCaseStyle.labelBtn} bg-pink-500 hover:bg-pink-600`}
        >
          Not Mergeable
        </label>
      ),
    [mergeable],
  );

  const mergeableMessage = useMemo(
    () => (
      <p className={`mt-2 ${mergeable ? 'text-emerald-500' : 'text-rose-500'}`}>
        {message}
      </p>
    ),
    [mergeable, message],
  );

  return (
    <TestCase
      key={`${testCase.name}-${index}`}
      className="!bg-gray-200"
      language={exercise.language}
      testCase={testCase}
      output={testCase.output}
      headingLabel={label}
      headingMessage={mergeableMessage}
      onUpdate={(props: ITestCaseProps) => updateCustomTest(props, index)}
      onDelete={() => deleteCustomTest(index)}
    />
  );
};

export default MergeableTestCase;
