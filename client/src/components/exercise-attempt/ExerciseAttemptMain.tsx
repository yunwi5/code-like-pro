import React from 'react';
import EditorOutputSection from './editor-output/EditorOutputSection';
import ExerciseInfoSection from './exercise-info/ExerciseInfoSection';

const ExerciseAttemptMain: React.FC = () => {
    return (
        <main className="flex flex-col lg:flex-row gap-x-5 lg:min-h-[max(92.5vh,35rem)] lg:max-h-[93vh] bg-gray-200/70 border-t-2 border-gray-300/90">
            {/* Code editor left side, consisting of prompt, test cases, and scratch pad */}
            <ExerciseInfoSection />

            {/* Code editor right side, consisting of control bar, editor and output */}
            <EditorOutputSection />
        </main>
    );
};

export default ExerciseAttemptMain;
