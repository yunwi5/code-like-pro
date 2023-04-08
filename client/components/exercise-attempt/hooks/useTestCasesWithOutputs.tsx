import { useMemo } from 'react';
import {
  IExerciseWithId,
  ITestCase,
  ITestCaseWithOutput,
  ITestOutput,
} from '../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';

function getExistingTestsWithNames(exercise: IExerciseWithId) {
  let openTestIndex = 0;
  return exercise.testCases.map((testCase) => {
    if (!testCase.hidden) openTestIndex++;
    return { ...testCase, name: `Test Case ${openTestIndex}` };
  });
}

// Match input test case and test output.
// It should ignore the input test cases that do not have output yet (ones just created from users)
function matchTestCaseAndOutput(testCases: ITestCase[], outputs: ITestOutput[]) {
  let outputIndex = 0;
  // Map test case and its corresponding output
  const testCaseWithOutputs = testCases.map((test) => {
    // test case does not have corresponding output ONLY IF the test is custom and hasOutput: false.
    if (test.custom && !test.hasOutput) return { ...test, output: undefined };

    const output = outputs[outputIndex];
    outputIndex++;
    return {
      ...test,
      output,
    };
  });

  return testCaseWithOutputs;
}

// Match testcase and outputs for the exercise the user is currently attempting
function useTestCasesWithOutputs(): ITestCaseWithOutput[] {
  const { exercise, testCaseOutputs, customTests } = useExerciseAttemptCtx();

  const existingTests = useMemo(
    () => exercise && getExistingTestsWithNames(exercise),
    [exercise],
  );

  const combinedTestCases = customTests.concat(existingTests ?? []);

  // Merge corresponding output to each test case
  const testCasesWithOutputs: ITestCaseWithOutput[] = useMemo(
    () => matchTestCaseAndOutput(combinedTestCases, testCaseOutputs),
    [combinedTestCases, testCaseOutputs],
  );

  return testCasesWithOutputs;
}

export default useTestCasesWithOutputs;
