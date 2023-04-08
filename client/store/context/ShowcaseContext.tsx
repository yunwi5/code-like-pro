import React, { useContext } from 'react';

import useExerciseCommentsQuery from '../../hooks/comment/exercise-comments/useExerciseCommentsQuery';
import useExerciseShowcaseQuery from '../../hooks/showcase/exercise-showcases/useExerciseShowcaseQuery';
import {
  IComment,
  IExerciseWithId,
  IShowCase,
  IUserSubmissionPopulated,
} from '../../models/interfaces';

interface IShowcaseContext {
  exercise: IExerciseWithId | null;
  userSubmission: IUserSubmissionPopulated | null;
  comments: IComment[];
  showcases: IShowCase[];
  commentsLoading: boolean;
  showcasesLoading: boolean;
}

const ShowcaseContext = React.createContext<IShowcaseContext>({
  exercise: null,
  userSubmission: null,
  comments: [],
  showcases: [],
  commentsLoading: false,
  showcasesLoading: false,
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
  const { comments, isLoading: commentsLoading } = useExerciseCommentsQuery(
    exercise._id,
    800,
  );

  const { showcases, isLoading: showcasesLoading } = useExerciseShowcaseQuery(
    exercise._id,
  );

  const value = {
    exercise,
    userSubmission,
    comments,
    showcases,
    commentsLoading,
    showcasesLoading,
  };

  return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};
