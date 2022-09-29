import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import TestCase from '../../../ui/test-cases/TestCase';
import TestCaseMessages from './TestCaseMessages';

// Displaying list of test cases for the user view.
// Should not allow users to modify or delete any test cases.
const TestCasesDisplay: React.FC = () => {
    const { exercise, testCaseOutputs } = useExerciseAttemptCtx();

    if (exercise == null) return null;

    return (
        <section className="flex-1 overflow-y-scroll bg-white pt-2 pb-5">
            <TestCaseMessages />
            <ul className="flex flex-col gap-4 px-2 xl:px-4 py-2">
                {exercise.testCases.map((testCase, idx) => {
                    // Only display non hidden test cases.
                    if (testCase.hidden) return null;

                    return (
                        <TestCase
                            key={idx}
                            language={exercise.language}
                            testCase={{ ...testCase, name: `Test Case ${idx + 1}` }}
                            output={testCaseOutputs[idx]}
                            readOnly={true}
                        />
                    );
                })}
            </ul>
        </section>
    );
};

export default TestCasesDisplay;
