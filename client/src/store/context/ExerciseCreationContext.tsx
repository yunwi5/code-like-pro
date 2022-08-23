import React, { useContext } from 'react';

interface IExerciseCreationContext {}

export const ExerciseCreationContext = React.createContext<IExerciseCreationContext>({});

export const useExerciseCreationContext = useContext(ExerciseCreationContext);

interface Props {}

export const ExerciseCreationContextProvider: React.FC<Props> = ({}) => {
    const value = {};

    return <ExerciseCreationContext.Provider value={value}></ExerciseCreationContext.Provider>;
};
