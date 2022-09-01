import React, { useContext } from 'react';
import { IExerciseWithId } from '../../models/interfaces';
import { mapJobeLangCodeToAppLanguage } from '../../utils/language';

interface IExerciseAttemptCtx {
    exercise: IExerciseWithId | null;
    runCode: () => void;
}

const ExerciseAttemptContext = React.createContext<IExerciseAttemptCtx>({
    exercise: null,
    runCode: () => {},
});

export const useExerciseAttemptCtx = () => useContext(ExerciseAttemptContext);

interface Props {
    exercise: IExerciseWithId;
    children: React.ReactNode;
}

export const ExerciseAttemptCtxProvider: React.FC<Props> = ({ exercise, children }) => {
    const runCode = () => {
        // output of the test cases => actual output, status like correctness
    };

    const value = { exercise, runCode };
    // Map language_code back to our client language name.
    exercise.language = mapJobeLangCodeToAppLanguage(exercise?.language || '');

    return (
        <ExerciseAttemptContext.Provider value={value}>
            {children}
        </ExerciseAttemptContext.Provider>
    );
};
