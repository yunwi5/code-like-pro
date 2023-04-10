import React from 'react';
import { notFound } from 'next/navigation';
import ExerciseEditMain from '@/components/exercise-edit/ExerciseEditMain';
import { getExerciseByIdData } from '@/apis/exercise.api';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Edit Your Challenge | ${AppProperty.APP_NAME}`,
  description: `Exercise edit page of ${AppProperty.APP_NAME} where users can edit their programming challenge in various programming languages.`,
};

export const revalidate = 60,
  fetchCache = 'auto';

type ExerciseEditPageProps = {
  params: { id: string };
};

async function ExerciseEditPage({ params: { id } }: ExerciseEditPageProps) {
  const exercise = await getExerciseByIdData(id);
  if (exercise == null) notFound();

  return <ExerciseEditMain exerciseId={id} exercise={exercise} />;
}

export default ExerciseEditPage;
