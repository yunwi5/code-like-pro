'use client';
import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useExerciseQuery from '@/hooks/exercise/exercise/useExerciseQuery';
import { IExerciseWithId, IUserSubmissionPopulated } from '@/models/interfaces';
import { ShowcaseContextProvider } from '@/store/context/ShowcaseContext';
import { useUserContext } from '@/store/context/UserContext';
import { getExerciseAttemptPageLink } from '@/utils/links.util';
import { toastNotify } from '@/utils/notification.util';

import ShowcaseMain from './ShowcaseMain';

type ShowcaseMainContainerProps = {
  exerciseId: string;
  exercise: IExerciseWithId;
};

const ShowcaseMainContainer: FC<ShowcaseMainContainerProps> = ({
  exerciseId,
  exercise: initialExerciseData,
}) => {
  const router = useRouter();
  const { isLoading, submissionMap, user } = useUserContext();
  const { exercise = initialExerciseData, error } = useExerciseQuery(exerciseId);
  if (error) throw new Error(error);

  const userSubmission: IUserSubmissionPopulated | undefined = submissionMap[exerciseId || ''];

  // prevent user from accessing showcase page if they have not solved the exercise yet.
  useEffect(() => {
    if (isLoading) return;

    const notAuthorAndNotSolved = user?._id !== exercise.author._id && !userSubmission?.correct;
    if (notAuthorAndNotSolved) {
      toastNotify('You have not solved this exercise yet!', 'error');
      router.push(getExerciseAttemptPageLink(exerciseId));
    }
  }, [isLoading, user?._id, exercise.author._id, userSubmission, exerciseId, router]);

  return (
    <ShowcaseContextProvider exercise={exercise} userSubmission={userSubmission}>
      <ShowcaseMain />
    </ShowcaseContextProvider>
  );
};

export default ShowcaseMainContainer;
