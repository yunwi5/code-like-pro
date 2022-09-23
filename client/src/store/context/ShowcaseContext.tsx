import React, { useContext } from 'react';
import useExerciseCommentsQuery from '../../hooks/queries/useExerciseCommentsQuery';
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
    userSubmission: IUserSubmissionPopulated | undefined;
    children: React.ReactNode;
}

export const ShowcaseContextProvider: React.FC<Props> = ({
    exercise,
    userSubmission = null,
    children,
}) => {
    // Use React-Query to fetch the comments data of this exercise.
    const { comments, refetch: refetchComments } = useExerciseCommentsQuery(exercise._id, 800);

    // Use React-Query to fetch the showcases data of this exercise.
    // Implementation should be here.

    // Refetch comment or showcase data from the server using custom query hooks.
    const refetchQuery = (option: QueryOption) => {
        if (option === 'comments') refetchComments();
    };

    const value = { exercise, userSubmission, comments, refetchQuery };

    return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};
