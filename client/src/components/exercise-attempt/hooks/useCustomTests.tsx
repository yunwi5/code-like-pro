import { ITestCase, ITestCaseProps } from '../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import { getEmptyCustomTestCase } from '../../../utils/exercise-utils/testcase';

function useCustomTests() {
    const { setTestCaseOutputs, customTests, setCustomTests } = useExerciseAttemptCtx();

    const addCustomTest = () => {
        const newCustomTest: ITestCase = getEmptyCustomTestCase(customTests.length);
        setCustomTests((prev) => [newCustomTest, ...prev]);
    };

    const updateCustomTest = (props: ITestCaseProps, index: number) => {
        const newList = [...customTests];
        newList[index] = { ...newList[index], ...props };
        setCustomTests(newList);
    };

    const deleteCustomTest = (targetIndex: number) => {
        setCustomTests((prevList) => prevList.filter((_, idx) => idx !== targetIndex));

        const testToDelete = customTests[targetIndex];
        // Delete the corresponding output ONLY IF the test has its output (otherwise bug)
        if (testToDelete.hasOutput)
            setTestCaseOutputs((prevOutputs) =>
                prevOutputs.filter((_, idx) => idx !== targetIndex),
            );
    };

    return { addCustomTest, updateCustomTest, deleteCustomTest };
}

export default useCustomTests;
