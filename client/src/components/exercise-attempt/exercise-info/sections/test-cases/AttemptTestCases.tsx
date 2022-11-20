import { useState } from 'react';
import {
    IExerciseWithId,
    ITestCase,
    ITestCaseProps,
    ITestCaseWithOutput,
    ITestOutput,
} from '../../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { getEmptyCustomTestCase } from '../../../../../utils/exercise-utils/testcase';
import TestCasesMergeModal from '../../../modals/TestCasesMergeModal';
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

    return testCaseWithOutputs;
}

// Displaying list of test cases for the user view.
// Should not allow users to modify or delete any test cases.
const AttemptTestCases: React.FC = () => {
    const { exercise, testCaseOutputs, setTestCaseOutputs, customTests, setCustomTests } =
        useExerciseAttemptCtx();
    const [showMergeModal, setShowMergeModal] = useState(false);

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
        setCustomTests((prevList) => prevList.filter((_, idx) => idx !== targetIndex));

        const testToDelete = customTests[targetIndex];
        // Delete the corresponding output ONLY IF the test has its output (otherwise bug)
        if (testToDelete.hasOutput)
            setTestCaseOutputs((prevOutputs) =>
                prevOutputs.filter((_, idx) => idx !== targetIndex),
            );
    };

    // Combine existing tests with new user custom tests
    const combinedTestCases = customTests.concat(existingTests);
    // Merge corresponding output to each test case
    const testCasesWithOutputs: ITestCaseWithOutput[] = matchTestCaseAndOutput(
        combinedTestCases,
        testCaseOutputs,
    );
    // Hidden tests should not be displayed during attempt.
    const nonHiddenTests = testCasesWithOutputs.filter(
        (test) => test.custom || !test.hidden,
    );

    const mergeReady = testCasesWithOutputs.every((test) => test.output?.correct);

    return (
        <section
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="flex-1 overflow-y-scroll bg-white pt-2 pb-5"
        >
            <div className="flex flex-wrap justify-between items-center">
                <TestCaseMessages testCasesWithOutputs={testCasesWithOutputs} />
                <TestCaseUserActions
                    onAddCase={addCustomTest}
                    onMerge={() => setShowMergeModal(true)}
                    mergeReady={mergeReady}
                />
            </div>

            {/* List of testcases combining creator's tests and user defined custom tests. */}
            <TestCasesList
                testCasesWithOutputs={nonHiddenTests}
                updateCustomTestCase={updateCustomTestCase}
                deleteCustomTestCase={deleteCustomTestCase}
            />

            {/* Modal for adding user tests to existing tests */}
            <TestCasesMergeModal
                open={showMergeModal}
                onClose={() => setShowMergeModal(false)}
                onAddTest={addCustomTest}
                onUpdateTest={updateCustomTestCase}
                onDeleteTest={deleteCustomTestCase}
                testCasesWithOutputs={testCasesWithOutputs}
            />
        </section>
    );
};

export default AttemptTestCases;
