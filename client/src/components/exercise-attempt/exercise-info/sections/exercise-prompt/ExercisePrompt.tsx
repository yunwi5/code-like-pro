import React from 'react';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import TextEditor from '../../../../ui/editor/text-editor/TextEditor';
import TagList from '../../../../ui/lists/TagList';
import ExercisePromptHeader from './ExercisePromptHeader';

const ExercisePrompt: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();

    return (
        <section
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="flex-1 flex flex-col gap-8 overflow-y-scroll px-5 py-4 bg-white"
        >
            <ExercisePromptHeader />
            <TextEditor
                className="read-only-editor"
                value={exercise?.prompt || ''}
                readOnly={true}
                placeholder={'Write something awesome...'}
            />

            {/* Display exercise relevant tags */}
            <footer className="-mt-3 flex flex-col gap-6">
                <TagList title="Relevant Tags:" tags={exercise?.tags || []} />
            </footer>
        </section>
    );
};

export default ExercisePrompt;
