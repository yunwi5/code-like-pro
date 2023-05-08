'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useExerciseQuery from '@/hooks/exercise/exercise/useExerciseQuery';
import { getExerciseAttemptPageLink } from '@/utils/links.util';
import { toastNotify } from '@/utils/notification.util';

import { IExerciseWithId, IUserSubmissionPopulated } from '../../models/interfaces';

import { useUserContext } from './UserContext';

interface IShowcaseContext {
  exercise: IExerciseWithId | null;
  userSubmission?: IUserSubmissionPopulated | null;
}

const ShowcaseContext = React.createContext<IShowcaseContext>(null!);

export const useShowcaseContext = () => useContext(ShowcaseContext);

interface Props {
  exercise: IExerciseWithId;
  children: React.ReactNode;
}

export const ShowcaseContextProvider: React.FC<Props> = ({
  exercise: initialExerciseData,
  children,
}) => {
  const router = useRouter();
  const { isLoading, submissionMap, user } = useUserContext();
  const exerciseId = initialExerciseData._id;
  const { exercise = initialExerciseData, error } = useExerciseQuery(exerciseId);
  if (error) throw new Error(error);

  const userSubmission: IUserSubmissionPopulated | undefined = submissionMap[exerciseId || ''];

  // Authorization
  useEffect(() => {
    if (isLoading) return;
    const notAuthorAndNotSolved = user?._id !== exercise.author._id && !userSubmission?.correct;
    if (notAuthorAndNotSolved) {
      toastNotify('You have not solved this exercise yet!', 'error');
      router.push(getExerciseAttemptPageLink(exerciseId));
    }
  }, [isLoading, user?._id, exercise.author._id, userSubmission, exerciseId, router]);

  const value = {
    exercise,
    userSubmission,
  };

  return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};
