import React, { Fragment } from 'react';
import { IExerciseWithId, ITestCaseWithOutput } from '../../../../models/interfaces';
import MergeableTestCase from '../../../ui/test-cases/MergeableTestCase';
import TestCase from '../../../ui/test-cases/TestCase';
import usePagination from '../../../../hooks/usePagination';
import PageNavigation from '../../../ui/PageNavigation';

interface Props {
    testCases: ITestCaseWithOutput[];
    exercise: IExerciseWithId;
}

const MergeableTestCasesList: React.FC<Props> = ({ testCases, exercise }) => {
    const {
        array: currentPageTests,
        page,
        setPage,
        maxPage,
    } = usePagination({ array: testCases, itemPerPage: 8, scrollEnabled: false });

    return (
        <div>
            <ul className="flex flex-col gap-4">
                {currentPageTests.map((testCase, idx) => {
                    // Only display non hidden test cases.
                    if (!testCase.custom && testCase.hidden) return null;

                    return (
                        <Fragment key={`${testCase.name}-${idx}`}>
                            {testCase.custom ? (
                                <MergeableTestCase
                                    exercise={exercise}
                                    testCase={testCase}
                                    index={idx}
                                />
                            ) : (
                                <TestCase
                                    className="!bg-gray-200 opacity-60"
                                    language={exercise.language}
                                    testCase={testCase}
                                    output={testCase.output}
                                    readOnly={true}
                                />
                            )}
                        </Fragment>
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

export default MergeableTestCasesList;
