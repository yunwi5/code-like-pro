import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { getExerciseComments } from '../../apis/exercise';
import { IComment, IExerciseWithId, IUserSubmissionPopulated } from '../../models/interfaces';

type QueryOption = 'comments' | 'showcases';

interface IShowcaseContext {
    exercise: IExerciseWithId | null;
    userSubmission: IUserSubmissionPopulated | null;
    comments: IComment[];
    refetchQuery: (option: QueryOption) => void;
}

const ShowcaseContext = React.createContext<IShowcaseContext>({
    exercise: null,
    userSubmission: null,
    comments: [],
    refetchQuery: () => {},
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
    const queryClient = useQueryClient();

    const commentQueryKey = `exercise-${exercise._id}.comment`;
    const { data: response } = useQuery(
        [commentQueryKey],
        () => getExerciseComments(exercise._id),
        { refetchInterval: 1000 },
    );

    const { data: comments, message: error } = response || {};
    if (error) console.log(error);

    const refetchQuery = (option: QueryOption) => {
        if (option === 'comments') queryClient.invalidateQueries([commentQueryKey]);
    };

    const value = { exercise, userSubmission, comments: comments || [], refetchQuery };

    return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};
