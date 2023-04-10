import dynamic from 'next/dynamic';
import React from 'react';
import { CreationSection } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const TextEditor = dynamic(
  () => import('@/components/ui/editor/text-editor/TextEditor'),
  { ssr: false },
);

const CreationPrompt: React.FC = () => {
  const { prompt, setPrompt } = useExerciseCreationContext();

  return (
    <CreationSectionContainer title="Prompt" id={CreationSection.PROMPT}>
      <TextEditor onChange={setPrompt} value={prompt} />
    </CreationSectionContainer>
  );
};

export default CreationPrompt;
