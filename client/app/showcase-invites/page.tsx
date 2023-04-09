import React from 'react';
import { getExercisesData } from '@/apis/exercise.api';
import ShowCaseInvitesMain from '@/components/showcase-invites/ShowCaseInvitesMain';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Showcases | ${AppProperty.APP_NAME}`,
  description:
    'List of coding exercise showcase forums where users can join in and participate in showcasing solutions and discussions.',
};

export const revalidate = 60,
  fetchCache = 'auto';

async function ShowcaseInvitePage() {
  const exercises = await getExercisesData();
  if (!exercises) throw new Error('Failed to fetch exercises data');

  return (
    <div className="flex-center min-h-[83vh]">
      <ShowCaseInvitesMain exercises={exercises} />
    </div>
  );
}

export default ShowcaseInvitePage;
