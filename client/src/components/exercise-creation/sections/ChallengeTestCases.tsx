import React from 'react';
import { CreationSection } from '../../../models/enums';
import { ITestCaseProps } from '../../../models/interfaces';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { getEmptyTestCase } from '../../../utils/exercise-creation-utils/testcase-utils';
import Button from '../../ui/buttons/Button';
import TestCase from '../../ui/test-cases/TestCaseInput';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeTestCases: React.FC = () => {
    const { testCases, language, setTestCases } = useExerciseCreationContext();

    const addTestCase = () => setTestCases((prevList) => [...prevList, getEmptyTestCase()]);

    const updateTestCase = (props: ITestCaseProps, index: number) => {
        const newList = [...testCases];
        newList[index] = { ...newList[index], ...props };
        setTestCases(newList);
    };

    const deleteTestCase = (targetIndex: number) => {
        setTestCases((prevList) => prevList.filter((test, idx) => idx !== targetIndex));
    };

    const title = (
        <div className="flex-between mb-5">
            <span>Test Cases</span>{' '}
            <Button onClick={addTestCase} className="translate-y-3">
                + Test Case
            </Button>
        </div>
    );

    return (
        <CreationSectionContainer title={title} id={CreationSection.TEST_CASES}>
            <div className="flex flex-col gap-5">
                {testCases.map((testCase, idx) => {
                    // testCase.name = `Test Case ${idx + 1}`;
                    return (
                        <TestCase
                            key={idx}
                            language={language}
                            testCase={{ ...testCase, name: `Test Case ${idx + 1}` }}
                            onUpdate={(props: ITestCaseProps) => updateTestCase(props, idx)}
                            onDelete={() => deleteTestCase(idx)}
                        />
                    );
                })}
            </div>
        </CreationSectionContainer>
    );
};

export default ChallengeTestCases;
