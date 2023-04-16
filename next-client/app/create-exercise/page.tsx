import React from 'react';

import ExerciseCreationMain from '@/components/exercise-creation/ExerciseCreationMain';
import { AppProperty } from '@/constants';
import { ExerciseCreationContextProvider } from '@/store/context/ExerciseCreationContext';

export const metadata = {
  title: `Create Challenge | ${AppProperty.APP_NAME}`,
  description: `Exercise creation page of ${AppProperty.APP_NAME} where users can create a new programming challenge in various programming languages.`,
};

async function ExerciseCreationPage() {
  return (
    <ExerciseCreationContextProvider>
      <ExerciseCreationMain />
    </ExerciseCreationContextProvider>
  );
}

export default ExerciseCreationPage;
