import React from 'react';
import { ITestCase, ITestOutput } from '../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';

function getOpenAndHiddenTestCounts(testCases: ITestCase[]) {
    const openTestCases = testCases.filter((ex) => !ex.hidden);

    const openTestCasesCount = openTestCases.length;
    const hiddenTestCasesCount = testCases.length - openTestCasesCount;
    return [openTestCasesCount, hiddenTestCasesCount];
}

// Generate test cases output messages
function generateOutputMessages(testCases: ITestCase[], outputs: ITestOutput[]) {
    if (outputs.length < 1) return ['', ''];
    const [openTestCasesCount, hiddenTestCasesCount] =
        getOpenAndHiddenTestCounts(testCases);

    let openTestCorrectCount = 0,
        hiddenTestCorrectCount = 0;
    testCases.forEach((test, idx) => {
        let output = outputs[idx];
        if (!test.hidden) {
            if (output.correct) openTestCorrectCount++;
        } else {
            if (output.correct) hiddenTestCorrectCount++;
        }
    });

    const allOpenTestsCorrect = openTestCorrectCount === openTestCasesCount;
    const allHiddenTestsCorrect = hiddenTestCorrectCount === hiddenTestCasesCount;

    return [
        <p className={`${allOpenTestsCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
            Open Test{openTestCorrectCount !== 1 && 's'} {openTestCorrectCount}/
            {openTestCasesCount} Correct
        </p>,
        <p className={`${allHiddenTestsCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
            Hidden Test{hiddenTestCorrectCount !== 1 && 's'} {hiddenTestCorrectCount}/
            {hiddenTestCasesCount} Correct
        </p>,
    ];
}

const TestCaseMessages: React.FC = () => {
    const { exercise, testCaseOutputs } = useExerciseAttemptCtx();

    if (exercise == null) return null;

    // Only display non hidden test cases.
    const [openTestCasesCount, hiddenTestCasesCount] = getOpenAndHiddenTestCounts(
        exercise.testCases,
    );

    const noTestCaseOutputs = testCaseOutputs.length === 0;
    const outputMessages = generateOutputMessages(exercise.testCases, testCaseOutputs);

    return (
        <div className="flex flex-wrap gap-5 px-6 py-2">
            {noTestCaseOutputs && (
                <>
                    <p className="text-gray-600">
                        <strong>{openTestCasesCount}</strong> Open Test
                        {openTestCasesCount !== 1 && 's'}
                    </p>
                    <p className="text-rose-500/90">
                        <strong>{hiddenTestCasesCount}</strong> Hidden Test
                        {hiddenTestCasesCount !== 1 && 's'}
                    </p>
                </>
            )}
            {!noTestCaseOutputs && (
                <>
                    {outputMessages[0]} {outputMessages[1]}
                </>
            )}
        </div>
    );
};

export default TestCaseMessages;
