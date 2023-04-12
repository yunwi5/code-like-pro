import React from 'react';
import { notFound } from 'next/navigation';

import { getExerciseByIdData, getExercisesData } from '@/apis/exercise.api';
import ShowcaseMainContainer from '@/components/showcase/ShowcaseMainContainer';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Showcase | ${AppProperty.APP_NAME}`,
  description:
    "Showcase page of a programming exercise where users can showcase their code, view other users' coding solutions and discuss the efficiency.",
};

export const revalidate = 60;

export async function generateStaticParams() {
  const exercises = await getExercisesData({ authDisabled: true });
  if (exercises == null) return [];

  return exercises.map((exercise) => ({ exerciseId: exercise._id }));
}

type ShowcasePageProps = {
  params: { exerciseId: string };
};

async function ShowcasePage({ params: { exerciseId } }: ShowcasePageProps) {
  const exercise = await getExerciseByIdData(exerciseId, {
    catchErrors: false,
    authDisabled: true,
  });
  if (exercise == null) notFound();

  return (
    <div className="flex-center min-h-[83vh] my-5 sm:my-10">
      <ShowcaseMainContainer exercise={exercise} exerciseId={exerciseId} />
    </div>
  );
}

export default ShowcasePage;
