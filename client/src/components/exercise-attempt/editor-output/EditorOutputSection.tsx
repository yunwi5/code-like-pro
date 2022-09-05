import React, { useEffect } from 'react';
import EditorControlBar from './EditorControlBar';
import CodeEditor from '../../ui/editor/CodeEditor';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import EditorActions from './EditorActions';
import useLocalStorage from '../../../hooks/useLocalStorage';

const EditorOutputSection: React.FC = () => {
    const { exercise, userSolution, setUserSolution } = useExerciseAttemptCtx();

    // Store current user's code in the localStorate, so that it is not lost when the user refreshes the page.
    const localStorageKey = `user-solution-${exercise?._id}`;
    const [localSolution, setLocalSolution] = useLocalStorage<string>(
        localStorageKey,
        userSolution,
    );

    const handleChange = (value: string | undefined) => {
        setUserSolution(value ?? '');
        setLocalSolution(value ?? '');
    };

    // When the user re-enters the page, or refreshes the page,
    // Retrieve previous user code for this exercise from the localStorage.
    useEffect(() => {
        if (!userSolution) {
            setUserSolution(localSolution);
        }
    }, [userSolution]);

    return (
        <div className="flex-1 flex flex-col">
            <EditorControlBar />
            <CodeEditor
                language={exercise?.language}
                onChange={handleChange}
                value={userSolution}
                height={'25rem'}
                className="flex-1 !border-none lg:!max-w-[50vw]"
                showHeader={false}
            />
            <EditorActions />
        </div>
    );
};

export default EditorOutputSection;
