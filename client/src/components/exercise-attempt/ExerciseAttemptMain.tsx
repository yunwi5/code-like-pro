import React from 'react';
import EditorOutputSection from './editor-output/EditorOutputSection';
import ExerciseInfo from './exercise-info/ExerciseInfoSection';

const ExerciseAttemptMain: React.FC = () => {
    return (
        <main className="flex gap-5 min-h-[max(90vh,35rem)] max-h-[93vh] bg-gray-200/70">
            {/* Code editor left side, consisting of prompt, test cases, and scratch pad */}
            <ExerciseInfo />
            {/* Code editor right side, consisting of control bar, editor and output */}
            <EditorOutputSection />
        </main>
    );
};

export default ExerciseAttemptMain;
