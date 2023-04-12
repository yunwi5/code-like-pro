import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getExerciseByIdData, getExercisesData } from '@/apis/exercise.api';
import ExerciseAttemptMain from '@/components/exercise-attempt/ExerciseAttemptMain';
import { AppProperty } from '@/constants';
import { getBrowsingPageLink } from '@/utils/links.util';

type ExerciseAttemptPageProps = { params: { id: string } };

export const revalidate = 60;

export async function generateMetadata({
  params: { id },
}: ExerciseAttemptPageProps): Promise<Metadata> {
  const exercise = await getExerciseByIdData(id);

  return {
    title: `Challenge ${exercise?.name ?? '?'} | ${AppProperty.APP_NAME}`,
    description: `Code editor page where users can attempt the coding challenge created by other users. Users can run the code and test the code before submission.`,
  };
}

export async function generateStaticParams() {
  const exercises = await getExercisesData({ authDisabled: true });
  if (exercises == null) return [];

  return exercises.map((exercise) => ({ id: exercise._id }));
}

async function ExerciseAttemptPage({ params: { id } }: ExerciseAttemptPageProps) {
  const exercise = await getExerciseByIdData(id, {
    catchErrors: false,
    authDisabled: true,
  });

  if (exercise == null) return redirect(getBrowsingPageLink());

  return <ExerciseAttemptMain exerciseId={id} exercise={exercise} />;
}

export default ExerciseAttemptPage;
