import React from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import CodeEditor from '../../../ui/editor/CodeEditor';

const ScratchPad: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();

    const scatchPadKey = `ScratchPad-${exercise?._id}`;
    // Store user note in the localStorage with a unique key. Update the note in the localStorage when the note updates.
    const [note, setNote] = useLocalStorage<string>(scatchPadKey, 'Add your note..');

    const handleChange = (value: string) => setNote(value);

    return (
        <section className="flex-1 flex flex-col overflow-y-scroll bg-white">
            <CodeEditor
                language={'text' as any}
                className="flex-1 min-h-[30rem]"
                value={note}
                onChange={handleChange}
                showHeader={false}
            />
        </section>
    );
};

export default ScratchPad;
