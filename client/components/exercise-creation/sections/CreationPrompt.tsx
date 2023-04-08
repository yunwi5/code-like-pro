import React from 'react';
import { CreationSection } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import TextEditor from '../../ui/editor/text-editor/TextEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const CreationPrompt: React.FC = () => {
  const { prompt, setPrompt } = useExerciseCreationContext();

  return (
    <CreationSectionContainer title="Prompt" id={CreationSection.PROMPT}>
      <TextEditor onChange={setPrompt} value={prompt} />
    </CreationSectionContainer>
  );
};

export default CreationPrompt;
