import React from 'react';
import { motion } from 'framer-motion';
import { ITestCase, ITestCaseProps, ITestOutput } from '../../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { listItemAnimations } from '../../../../../utils/animations';
import TestCase from '../../../../ui/test-cases/TestCase';

export interface ITestCaseWithOutput extends ITestCase {
    output?: ITestOutput;
}

interface Props {
    testCasesWithOutputs: ITestCaseWithOutput[];
    updateCustomTestCase: (props: ITestCaseProps, index: number) => void;
    deleteCustomTestCase: (index: number) => void;
}

const TestCasesList: React.FC<Props> = ({
    testCasesWithOutputs,
    updateCustomTestCase,
    deleteCustomTestCase,
}) => {
    const { exercise } = useExerciseAttemptCtx();
    if (exercise == null) return null;

    return (
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
                                key={`${testCase.name}-${idx}`}
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
    );
};

export default TestCasesList;
