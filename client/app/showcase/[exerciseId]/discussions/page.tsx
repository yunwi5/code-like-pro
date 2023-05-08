import React from 'react';

import { getExerciseCommentsData } from '@/apis/exercise.api';
import ShowcaseDiscussions from '@/components/showcase/discussions/ShowcaseDiscussions';

export const revalidate = 60;

type DiscussionsProos = {
  params: { exerciseId: string };
};

async function DiscussionsPage({ params: { exerciseId } }: DiscussionsProos) {
  const comments = await getExerciseCommentsData(exerciseId, {
    authDisabled: true,
    catchErrors: false,
  });
  if (comments == null) throw new Error('Could not fetch comments data!');

  return <ShowcaseDiscussions comments={comments} />;
}

export default DiscussionsPage;
