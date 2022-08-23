import React from 'react';
import { CreationSection, Language } from '../../../models/enums';
import Button from '../../ui/buttons/Button';
import TestCase from '../../ui/test-cases/TestCase';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeTestCases: React.FC = () => {
    const title = (
        <div className="flex-between mb-5">
            <span>Test Cases</span> <Button className="translate-y-3">+ Test Case</Button>
        </div>
    );

    return (
        <CreationSectionContainer title={title} id={CreationSection.TEST_CASES}>
            <TestCase
                name="Test Case 1"
                code='print("Hello world!")'
                expectedOutput="Hello world!"
                language={Language.PYTHON}
            />
        </CreationSectionContainer>
    );
};

export default ChallengeTestCases;
