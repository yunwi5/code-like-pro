import React, { useEffect, useState } from 'react';
import useExerciseReportsQuery from '../../../hooks/exercise-queries/useExerciseReportsQuery';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import ExerciseInfoNav from './sections/ExerciseInfoNav';
import ExercisePrompt from './sections/exercise-prompt/ExercisePrompt';
import ExerciseIssueReports from './sections/ExerciseIssueReports';
import PreviousSubmission from './sections/PreviousSubmission';
import TestCasesDisplay from './sections/test-cases/AttemptTestCases';

export enum SubSection {
    PROMPT = 'Prompt',
    TEST_CASES = 'Test Cases',
    ISSUES = 'Issues',
    SUBMISSION = 'Submission', // Previous user submission
}

export const SubSectionList = Object.freeze(Object.values(SubSection));

// Left side of the code editor page.
const ExerciseInfoSection: React.FC = () => {
    const { testCaseOutputs, exercise } = useExerciseAttemptCtx();
    const [activeSubSection, setActiveSubSection] = useState(SubSection.PROMPT);

    // Fetch all the reports regarding this exercise
    const { reports, isLoading } = useExerciseReportsQuery(exercise?._id);

    // Whenever user runs the code, switch the section to testCases section
    // So that users can see the output of their tests immediately without having to switch to testCases sectio manually.
    useEffect(() => {
        if (testCaseOutputs.length > 0) setActiveSubSection(SubSection.TEST_CASES);
    }, [testCaseOutputs.length]);

    return (
        <div className="flex-1 flex flex-col text-gray-700">
            <ExerciseInfoNav
                activeSubSection={activeSubSection}
                setActiveSubSection={setActiveSubSection}
            />
            {activeSubSection === SubSection.PROMPT && <ExercisePrompt />}
            {activeSubSection === SubSection.TEST_CASES && <TestCasesDisplay />}
            {activeSubSection === SubSection.ISSUES && (
                <ExerciseIssueReports reports={reports} isLoading={isLoading} />
            )}
            {activeSubSection === SubSection.SUBMISSION && <PreviousSubmission />}
        </div>
    );
};

export default ExerciseInfoSection;
