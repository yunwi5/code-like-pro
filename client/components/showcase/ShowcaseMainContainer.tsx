'use client';
import React, { FC } from 'react';
import useExerciseQuery from '@/hooks/exercise/exercise/useExerciseQuery';
import { IExerciseWithId, IUserSubmissionPopulated } from '@/models/interfaces';
import { ShowcaseContextProvider } from '@/store/context/ShowcaseContext';
import { useUserContext } from '@/store/context/UserContext';
import ShowcaseMain from './ShowcaseMain';

type ShowcaseMainContainerProps = {
  exerciseId: string;
  exercise: IExerciseWithId;
};

const ShowcaseMainContainer: FC<ShowcaseMainContainerProps> = ({
  exerciseId,
  exercise: initialExerciseData,
}) => {
  const { submissionMap } = useUserContext();
  const { exercise = initialExerciseData, error } = useExerciseQuery(exerciseId);
  if (error) throw new Error(error);

  const userSubmission: IUserSubmissionPopulated | undefined =
    submissionMap[exerciseId || ''];

  return (
    <ShowcaseContextProvider exercise={exercise} userSubmission={userSubmission}>
      <ShowcaseMain />
    </ShowcaseContextProvider>
  );
};

export default ShowcaseMainContainer;
