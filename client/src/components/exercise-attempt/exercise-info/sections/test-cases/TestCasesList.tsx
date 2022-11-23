import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ITestCaseProps, ITestCaseWithOutput } from '../../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import { listItemAnimations } from '../../../../../utils/animations';
import TestCase from '../../../../ui/test-cases/TestCase';
import usePagination from '../../../../../hooks/usePagination';
import PageNavigation from '../../../../ui/PageNavigation';

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

    const {
        array: currentPageTests,
        page,
        setPage,
        maxPage,
    } = usePagination({ array: testCasesWithOutputs, itemPerPage: 5 });

    if (exercise == null) return null;

    return (
        <div>
            <ul className="flex flex-col gap-4 px-2 xl:px-4 py-2">
                {currentPageTests.map((testCase, idx) => {
                    // Only display non hidden test cases.
                    if (!testCase.custom && testCase.hidden) return null;

                    return (
                        <motion.li
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
                                    hiddenDisabled={true}
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
                        </motion.li>
                    );
                })}
            </ul>
            <PageNavigation
                className="mt-4"
                currentPage={page}
                onChangePage={setPage}
                totalPages={maxPage}
            />
        </div>
    );
};

// If the render resutls are different, react updates the DOM
export default React.memo(TestCasesList, (prevProps, nextProps) => {
    return prevProps.testCasesWithOutputs === nextProps.testCasesWithOutputs;
});
