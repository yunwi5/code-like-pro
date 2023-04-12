'use client';
import React, { FC, useMemo } from 'react';

import useExerciseQuery from '@/hooks/exercise/exercise/useExerciseQuery';
import useAuth from '@/hooks/utils/useAuth';
import { IExerciseWithId } from '@/models/interfaces';
import { ExerciseAttemptCtxProvider } from '@/store/context/ExerciseAttemptContext';
import { useUserContext } from '@/store/context/UserContext';

import AttemptActionsSection from './attempt-actions/AttemptActionsSection';
import AttemptGuideSection from './attempt-guide/AttemptGuideSection';

type ExerciseAttemptContainerProps = {
  exerciseId: string;
  exercise: IExerciseWithId;
};

const ExerciseAttemptMain: FC<ExerciseAttemptContainerProps> = ({
  exerciseId,
  exercise: initialExerciseData,
}) => {
  useAuth();
  const { submissionMap } = useUserContext();
  const { exercise = initialExerciseData, refetch } = useExerciseQuery(exerciseId);

  const userSubmission = useMemo(
    () =>
      submissionMap[exerciseId] && {
        ...submissionMap[exerciseId],
        exercise: exerciseId,
      },
    [submissionMap, exerciseId],
  );

  return (
    <ExerciseAttemptCtxProvider
      refetchExercise={refetch}
      exercise={exercise}
      userSubmission={userSubmission}
    >
      <main className="flex flex-col lg:flex-row gap-x-5 lg:min-h-[max(92.5vh,35rem)] lg:max-h-[93vh] bg-gray-200/70 border-t-2 border-gray-300/90">
        <AttemptGuideSection />
        <AttemptActionsSection />
      </main>
    </ExerciseAttemptCtxProvider>
  );
};

export default ExerciseAttemptMain;
