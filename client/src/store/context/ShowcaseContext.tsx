import React, { useContext, useEffect, useState } from 'react';
import { IExerciseWithId, IUserSubmissionPopulated } from '../../models/interfaces';

interface IShowcaseContext {
    exercise: IExerciseWithId | null;
    userSubmission: IUserSubmissionPopulated | null;
}

const ShowcaseContext = React.createContext<IShowcaseContext>({
    exercise: null,
    userSubmission: null,
});

// Custom hook to access shwocase context data dirctly.
export const useShowcase = () => useContext(ShowcaseContext);

interface Props {
    exercise: IExerciseWithId;
    userSubmission: IUserSubmissionPopulated;
    children: React.ReactNode;
}

export const ShowcaseContextProvider: React.FC<Props> = ({
    exercise,
    userSubmission,
    children,
}) => {
    const value = { exercise, userSubmission };

    return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};
