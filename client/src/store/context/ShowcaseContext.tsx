import React, { useContext } from 'react';
import useExerciseCommentsQuery from '../../hooks/exercise/exercise-comments/useExerciseCommentsQuery';
import useExerciseShowcaseQuery from '../../hooks/showcase/useExerciseShowcaseQuery';
import {
    IComment,
    IExerciseWithId,
    IShowCase,
    IUserSubmissionPopulated,
} from '../../models/interfaces';

type QueryOption = 'comments' | 'showcases';

interface IShowcaseContext {
    exercise: IExerciseWithId | null;
    userSubmission: IUserSubmissionPopulated | null;
    comments: IComment[];
    showcases: IShowCase[];
    commentsLoading: boolean;
    showcasesLoading: boolean;
    refetchQuery: (option: QueryOption) => void;
}

const ShowcaseContext = React.createContext<IShowcaseContext>({
    exercise: null,
    userSubmission: null,
    comments: [],
    showcases: [],
    commentsLoading: false,
    showcasesLoading: false,
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
    const {
        comments,
        refetch: refetchComments,
        isLoading: commentsLoading,
    } = useExerciseCommentsQuery(exercise._id, 800);

    const {
        showcases,
        refetch: refetchShowcases,
        isLoading: showcasesLoading,
    } = useExerciseShowcaseQuery(exercise._id);

    // Refetch comment or showcase data from the server using custom query hooks.
    const refetchQuery = (option: QueryOption) => {
        if (option === 'comments') refetchComments();
        if (option === 'showcases') refetchShowcases();
    };

    const value = {
        exercise,
        userSubmission,
        comments,
        showcases,
        commentsLoading,
        showcasesLoading,
        refetchQuery,
    };

    return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};
