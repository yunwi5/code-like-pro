import React from 'react';
import { getExercisesData } from '@/apis/exercise.api';
import { AppProperty } from '@/constants';
import BrowsingMain from '@/components/browsing/BrowsingMain';

export const metadata = {
  title: `Browsing Challenge | ${AppProperty.APP_NAME}`,
  description:
    'Challenge browsing page where users can browse the progmmraing challenges with advanced searching, sorting and filtering functionalities.',
};

export const revalidate = 30,
  fetchCache = 'auto';

async function BrowsingPage() {
  const exercises = await getExercisesData({ catchErrors: false, authEnabled: false });
  if (exercises == null) throw new Error('Failed to fetch exercises data');

  return <BrowsingMain exercises={exercises} />;
}

export default BrowsingPage;
