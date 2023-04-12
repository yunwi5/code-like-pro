'use client';
import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useExerciseQuery from '@/hooks/exercise/exercise/useExerciseQuery';
import { IExerciseWithId } from '@/models/interfaces';
import { ExerciseCreationContextProvider } from '@/store/context/ExerciseCreationContext';
import { useUserContext } from '@/store/context/UserContext';
import { toastNotify } from '@/utils/notification.util';

import ExerciseCreationMain from '../exercise-creation/ExerciseCreationMain';

type ExerciseEditMainProps = {
  exerciseId: string;
  exercise: IExerciseWithId;
};

const ExerciseEditMain: FC<ExerciseEditMainProps> = ({
  exerciseId,
  exercise: initialExerciseData,
}) => {
  const router = useRouter();
  const { user, isLoading } = useUserContext();
  const { exercise = initialExerciseData, error } = useExerciseQuery(exerciseId);
  if (error) console.log(error);

  useEffect(() => {
    if (isLoading) return;

    if (user?._id !== exercise.author._id) {
      toastNotify('You are not authorized to edit this exercise!', 'error');
      router.push('/');
    }
  }, [user, isLoading, router, exercise.author._id]);

  return (
    // re-use
    <ExerciseCreationContextProvider exercise={exercise}>
      <ExerciseCreationMain />
    </ExerciseCreationContextProvider>
  );
};

export default ExerciseEditMain;
