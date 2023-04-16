import React from 'react';
import { notFound } from 'next/navigation';

import { getExerciseByIdData, getExercisesData } from '@/apis/exercise.api';
import ShowcaseMain from '@/components/showcase/ShowcaseMain';
import { AppProperty } from '@/constants';
import { ShowcaseContextProvider } from '@/store/context/ShowcaseContext';

type ShowcaseLayoutProps = {
  children: React.ReactNode;
  params: { exerciseId: string };
};

export const revalidate = 60;

export const metadata = {
  title: `Showcase | ${AppProperty.APP_NAME}`,
  description:
    "Showcase page of a programming exercise where users can showcase their code, view other users' coding solutions and discuss the efficiency.",
};

export async function generateStaticParams() {
  const exercises = await getExercisesData({ authDisabled: true });
  if (exercises == null) return [];

  return exercises.map((exercise) => ({ exerciseId: exercise._id }));
}

async function ShowcaseLayout({ children, params: { exerciseId } }: ShowcaseLayoutProps) {
  const exercise = await getExerciseByIdData(exerciseId, {
    catchErrors: false,
    authDisabled: true,
  });
  if (exercise == null) notFound();

  return (
    <div className="flex-center min-h-[83vh] my-5 sm:my-10">
      <ShowcaseContextProvider exercise={exercise}>
        <ShowcaseMain>{children}</ShowcaseMain>
      </ShowcaseContextProvider>
    </div>
  );
}

export default ShowcaseLayout;
