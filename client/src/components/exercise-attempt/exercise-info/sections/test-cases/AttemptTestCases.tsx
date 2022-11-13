import { motion } from 'framer-motion';
import {
    IExerciseWithId,
    ITestCase,
    ITestCaseProps,
    ITestOutput,
} from '../../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { listItemAnimations } from '../../../../../utils/animations';
import { getEmptyCustomTestCase } from '../../../../../utils/exercise-utils/testcase';
import TestCase from '../../../../ui/test-cases/TestCase';
import TestCaseMessages from './TestCaseMessages';
import TestCaseUserActions from './TestCaseUserActions';

function getExistingTestsWithNames(exercise: IExerciseWithId) {
    let testIndex = 0;
    return exercise.testCases.map((testCase) => {
        if (!testCase.hidden) testIndex++;
        return { ...testCase, name: `Test Case ${testIndex}` };
    });
}

function mapTestCaseAndOutput(testCases: ITestCase[], outputs: ITestOutput[]) {
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
    const { exercise, testCaseOutputs, customTests, setCustomTests } =
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
        setCustomTests((prevList) => prevList.filter((_, idx) => idx !== targetIndex));
    };

    // Combine existing tests with new user custom tests
    const combinedTestCases = customTests.concat(existingTests);
    // Merge corresponding output to each test case
    const testCasesWithOutputs = mapTestCaseAndOutput(combinedTestCases, testCaseOutputs);

    return (
        <section className="flex-1 overflow-y-scroll bg-white pt-2 pb-5">
            <div className="flex flex-wrap justify-between items-center">
                <TestCaseMessages />
                <TestCaseUserActions onAddCase={addCustomTest} />
            </div>
            <ul className="flex flex-col gap-4 px-2 xl:px-4 py-2">
                {testCasesWithOutputs.map((testCase, idx) => {
                    // Only display non hidden test cases.
                    if (!testCase.custom && testCase.hidden) return null;

                    return (
                        <motion.div
                            key={idx}
                            variants={listItemAnimations}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                            {testCase.custom ? (
                                <TestCase
                                    key={`${testCase.name}-${idx}`}
                                    language={exercise.language}
                                    testCase={testCase}
                                    output={testCase.output}
                                    onUpdate={(props: ITestCaseProps) =>
                                        updateCustomTestCase(props, idx)
                                    }
                                    onDelete={() => deleteCustomTestCase(idx)}
                                />
                            ) : (
                                <TestCase
                                    key={`test-case-${idx}`}
                                    language={exercise.language}
                                    testCase={testCase}
                                    output={testCase.output}
                                    readOnly={true}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </ul>
        </section>
    );
};

export default AttemptTestCases;
