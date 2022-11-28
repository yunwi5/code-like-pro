import React from 'react';
import AttemptActionsSection from './attempt-actions/AttemptActionsSection';
import AttemptGuideSection from './attempt-guide/AttemptGuideSection';

const ExerciseAttemptMain: React.FC = () => {
    return (
        <main className="flex flex-col lg:flex-row gap-x-5 lg:min-h-[max(92.5vh,35rem)] lg:max-h-[93vh] bg-gray-200/70 border-t-2 border-gray-300/90">
            {/* Code editor left side, consisting of prompt, test cases, and scratch pad */}
            <AttemptGuideSection />

            {/* Code editor right side, consisting of control bar, editor. */}
            <AttemptActionsSection />
        </main>
    );
};

export default ExerciseAttemptMain;
