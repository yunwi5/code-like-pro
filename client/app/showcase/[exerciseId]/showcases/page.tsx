import React from 'react';

import { getExerciseShowcasesData } from '@/apis/exercise.api';
import ShowcaseShowcases from '@/components/showcase/showcases/ShowcaseShowcases';

export const revalidate = 60;

type ShowcasesProps = {
  params: { exerciseId: string };
};

async function ShowcasesPage({ params: { exerciseId } }: ShowcasesProps) {
  const showcases = await getExerciseShowcasesData(exerciseId, {
    authDisabled: true,
    catchErrors: false,
  });
  if (showcases == null) throw new Error('Could not fetch showcases data!');

  return <ShowcaseShowcases showcases={showcases} />;
}

export default ShowcasesPage;
