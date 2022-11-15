import {
    IExerciseWithId,
    ITestCase,
    ITestCaseProps,
    ITestOutput,
} from '../../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { getEmptyCustomTestCase } from '../../../../../utils/exercise-utils/testcase';
import TestCaseMessages from './TestCaseMessages';
import TestCasesList from './TestCasesList';
import TestCaseUserActions from './TestCaseUserActions';

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

    const nonHiddenTests = testCaseWithOutputs.filter(
        (test) => test.custom || !test.hidden,
    );
    return nonHiddenTests;
}

// Displaying list of test cases for the user view.
// Should not allow users to modify or delete any test cases.
const AttemptTestCases: React.FC = () => {
    const { exercise, testCaseOutputs, setTestCaseOutputs, customTests, setCustomTests } =
        useExerciseAttemptCtx();
    if (exercise == null) return null;

    const existingTests = getExistingTestsWithNames(exercise);

    const addCustomTest = () => {
        const newCustomTest: ITestCase = getEmptyCustomTestCase(customTests.length);
        setCustomTests((prev) => [newCustomTest, ...prev]);
    };

    const updateCustomTestCase = (props: ITestCaseProps, index: number) => {
        const newList = [...customTests];
        newList[index] = { ...newList[index], ...props };
        setCustomTests(newList);
    };

    const deleteCustomTestCase = (targetIndex: number) => {
        setTestCaseOutputs((prevOutputs) =>
            prevOutputs.filter((_, idx) => idx !== targetIndex),
        );
        setCustomTests((prevList) => prevList.filter((_, idx) => idx !== targetIndex));
    };

    // Combine existing tests with new user custom tests
    const combinedTestCases = customTests.concat(existingTests);
    // Merge corresponding output to each test case
    const testCasesWithOutputs = matchTestCaseAndOutput(
        combinedTestCases,
        testCaseOutputs,
    );

    return (
        <section
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="flex-1 overflow-y-scroll bg-white pt-2 pb-5"
        >
            <div className="flex flex-wrap justify-between items-center">
                <TestCaseMessages testCasesWithOutputs={testCasesWithOutputs} />
                <TestCaseUserActions onAddCase={addCustomTest} />
            </div>

            {/* List of testcases combining creator's tests and user defined custom tests. */}
            <TestCasesList
                testCasesWithOutputs={testCasesWithOutputs}
                updateCustomTestCase={updateCustomTestCase}
                deleteCustomTestCase={deleteCustomTestCase}
            />
        </section>
    );
};

export default AttemptTestCases;
