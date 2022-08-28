import React, { useContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { IExercise } from '../../models/interfaces';
import { DRAFT_LOCAL_STORATE_KEY } from './ExerciseCreationContext';

interface IExerciseAttemptCtx {
    exercise: IExercise | null;
    runCode: () => void;
}

const ExerciseAttemptContext = React.createContext<IExerciseAttemptCtx>({
    exercise: null,
    runCode: () => {},
});

export const useExerciseAttemptCtx = () => useContext(ExerciseAttemptContext);

interface Props {
    exercise: IExercise | null;
    children: React.ReactNode;
}

export const ExerciseAttemptCtxProvider: React.FC<Props> = ({
    exercise: exerciseProp,
    children,
}) => {
    // At the moment, exercise APIs are not created, so the exercise data will be retrieved from the localStorage.
    // This will be replaced with real exercise data from the server. This acts as a dummy dadta.
    const [exercise, _] = useLocalStorage<IExercise>(DRAFT_LOCAL_STORATE_KEY, exerciseProp);

    const runCode = () => {
        // output of the test cases => actual output, status like correctness
    };

    const value = { exercise, runCode };

    return (
        <ExerciseAttemptContext.Provider value={value}>
            {children}
        </ExerciseAttemptContext.Provider>
    );
};
