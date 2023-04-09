import React from 'react';
import { getExerciseByIdData } from '@/apis/exercise.api';
import ShowcaseMainContainer from '@/components/showcase/ShowcaseMainContainer';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Showcase | ${AppProperty.APP_NAME}`,
  description:
    "Showcase page of a programming exercise where users can showcase their code, view other users' coding solutions and discuss the efficiency.",
};

export const revalidate = 60,
  fetchCache = 'auto';

type ShowcasePageProps = {
  params: { id: string };
};

async function ShowcasePage({ params: { id } }: ShowcasePageProps) {
  const exercise = await getExerciseByIdData(id);
  if (exercise == null) throw new Error('Exercise not found!');

  return (
    <div className="flex-center min-h-[83vh] my-5 sm:my-10">
      <ShowcaseMainContainer exercise={exercise} exerciseId={id} />
    </div>
  );
}

export default ShowcasePage;
