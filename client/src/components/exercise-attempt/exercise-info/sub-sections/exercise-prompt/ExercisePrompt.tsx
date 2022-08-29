import React from 'react';
import ReactQuill from 'react-quill';

import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import ExercisePromptFooter from './ExercisePromptFooter';
import ExercisePromptHeader from './ExercisePromptHeader';

const ExercisePrompt: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();

    console.log(exercise);

    return (
        <section className="flex-1 flex flex-col gap-8 overflow-y-scroll px-5 py-4 bg-white">
            <ExercisePromptHeader />
            <ReactQuill
                className="read-only-editor"
                theme="snow"
                value={exercise?.prompt || ''}
                onChange={() => {}}
                placeholder={'Write something awesome...'}
            />
            <ExercisePromptFooter />
        </section>
    );
};

export default ExercisePrompt;
