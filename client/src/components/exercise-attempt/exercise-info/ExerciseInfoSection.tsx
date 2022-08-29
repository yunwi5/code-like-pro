import React, { useState } from 'react';
import ExerciseInfoNav from './ExerciseInfoNav';
import ExercisePrompt from './sub-sections/exercise-prompt/ExercisePrompt';
import ScratchPad from './sub-sections/ScratchPad';
import TestCasesDisplay from './sub-sections/TestCasesDisplay';

export enum SubSection {
    PROMPT = 'Prompt',
    TEST_CASES = 'Test Cases',
    SCRATCH_PAD = 'Scratch Pad',
}

export const SubSectionList = Object.freeze(Object.values(SubSection));

// Left side of the code editor page.
const ExerciseInfoSection: React.FC = () => {
    const [activeSubSection, setActiveSubSection] = useState(SubSection.PROMPT);

    return (
        <div className="flex-1 flex flex-col text-gray-700">
            <ExerciseInfoNav
                activeSubSection={activeSubSection}
                setActiveSubSection={setActiveSubSection}
            />
            {activeSubSection === SubSection.PROMPT && <ExercisePrompt />}
            {activeSubSection === SubSection.TEST_CASES && <TestCasesDisplay />}
            {activeSubSection === SubSection.SCRATCH_PAD && <ScratchPad />}
        </div>
    );
};

export default ExerciseInfoSection;
