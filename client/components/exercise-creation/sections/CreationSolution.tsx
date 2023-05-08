import React from 'react';

import { CreationSection, Language } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { LanguageStartingTemplate } from '../../../utils/language.util';
import { removeAllSpaces } from '../../../utils/string-utils/string-manipulation.util';
import CodeEditor from '../../ui/editor/code-editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';
import CreationHelp from '../creation-help/CreationHelp';

const CreationSolution: React.FC = () => {
  const { language, solutionCode, setSolutionCode } = useExerciseCreationContext();

  const handleChange = (value: string | undefined) => setSolutionCode(value ?? '');

  const heading = (
    <div className="flex-between gap-2">
      <span>Solution Code</span>
      <CreationHelp defaultLanguage={language} />
    </div>
  );

  return (
    <CreationSectionContainer
      title={heading}
      testId="solution-code"
      id={CreationSection.SOLUTION_CODE}
    >
      <CodeEditor
        language={language}
        onChange={handleChange}
        value={getUserSolutionForSelectedLang(language, solutionCode)}
        height={'22rem'}
      />
    </CreationSectionContainer>
  );
};

// Provide initial template code to the user, when the user changes the language.
// If the user has not written any code to the solution space yet, insert the starting template code for users to start with.
// If the user has written any solution by themselves, do not replace their code by a new language.
function getUserSolutionForSelectedLang(language: Language, solutionCode: string) {
  const templatesTrimmed = Object.values(LanguageStartingTemplate).map((temp) =>
    removeAllSpaces(temp),
  );
  const solutionCodeTrimmed = removeAllSpaces(solutionCode || '');

  if (templatesTrimmed.includes(solutionCodeTrimmed))
    return LanguageStartingTemplate[language] || '';
  return solutionCode;
}

export default CreationSolution;
