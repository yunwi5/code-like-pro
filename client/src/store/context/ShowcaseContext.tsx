import React, { useContext, useEffect, useState } from 'react';
import { IExerciseWithId } from '../../models/interfaces';

interface IShowcaseContext {
    exercise: IExerciseWithId | null;
}

const ShowcaseContext = React.createContext<IShowcaseContext>({
    exercise: null,
});

// Custom hook to access shwocase context data dirctly.
export const useShowcase = () => useContext(ShowcaseContext);

interface Props {
    exercise: IExerciseWithId;
    children: React.ReactNode;
}

export const ShowcaseContextProvider: React.FC<Props> = ({ exercise, children }) => {
    const value = { exercise };

    return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};
