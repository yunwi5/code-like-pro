import { useCallback } from 'react';

import { ITestCase, ITestCaseProps } from '../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import { getEmptyCustomTestCase } from '../../../utils/exercise-utils/testcase';

function useCustomTests() {
  const { setTestCaseOutputs, customTests, setCustomTests } = useExerciseAttemptCtx();

  const addCustomTest = useCallback(() => {
    const newCustomTest: ITestCase = getEmptyCustomTestCase(customTests.length);
    setCustomTests((prev) => [newCustomTest, ...prev]);
  }, [customTests.length, setCustomTests]);

  const updateCustomTest = useCallback(
    (props: ITestCaseProps, index: number) => {
      setCustomTests((prevTests) => {
        const newList = [...prevTests];
        newList[index] = { ...newList[index], ...props };
        return newList;
      });
    },
    [setCustomTests],
  );

  const deleteCustomTest = useCallback(
    (targetIndex: number) => {
      setCustomTests((prevList) => prevList.filter((_, idx) => idx !== targetIndex));

      const testToDelete = customTests[targetIndex];
      // Delete the corresponding output ONLY IF the test has its output (otherwise bug)
      if (testToDelete.hasOutput)
        setTestCaseOutputs((prevOutputs) => prevOutputs.filter((_, idx) => idx !== targetIndex));
    },
    [customTests, setCustomTests, setTestCaseOutputs],
  );

  return { addCustomTest, updateCustomTest, deleteCustomTest };
}

export default useCustomTests;
