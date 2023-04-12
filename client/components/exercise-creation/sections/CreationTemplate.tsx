import React from 'react';

import { CreationSection } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import CodeEditor from '../../ui/editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const CreationTemplate: React.FC = () => {
  const { language, startingTemplate, setStartingTemplate } = useExerciseCreationContext();

  const handleChange = (value: string | undefined) => setStartingTemplate(value ?? '');

  return (
    <CreationSectionContainer title="User Starting Template" id={CreationSection.STARTING_TEMPLATE}>
      <CodeEditor
        language={language}
        onChange={handleChange}
        value={startingTemplate}
        height={'13rem'}
      />
    </CreationSectionContainer>
  );
};

export default CreationTemplate;
