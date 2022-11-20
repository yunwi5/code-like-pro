import { FC } from 'react';

import {
    IExerciseWithId,
    ITestCaseProps,
    ITestCaseWithOutput,
} from '../../../models/interfaces';
import { checkTestCaseMergeable } from '../../../utils/exercise-utils/testcase';
import TestCase from './TestCase';

const MergeableTestCaseStyle = {
    labelBtn: 'mr-auto ml-2 px-3 py-1 text-sm text-white rounded-full shadow',
};

const MergeableTestCase: FC<{
    exercise: IExerciseWithId;
    testCase: ITestCaseWithOutput;
    onUpdateTest: (props: ITestCaseProps, index: number) => void;
    onDeleteTest: (targetIndex: number) => void;
    index: number;
}> = ({ exercise, testCase, onUpdateTest, onDeleteTest, index }) => {
    const { mergeable, message } = checkTestCaseMergeable(exercise.testCases, testCase);
    const label = mergeable ? (
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
    );

    const mergeableMessage = (
        <p className={`mt-2 ${mergeable ? 'text-emerald-500' : 'text-rose-500'}`}>
            {message}
        </p>
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
            onUpdate={(props: ITestCaseProps) => onUpdateTest(props, index)}
            onDelete={() => onDeleteTest(index)}
        />
    );
};

export default MergeableTestCase;
