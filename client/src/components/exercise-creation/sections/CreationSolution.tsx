import React from 'react';
import { CreationSection, Language } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { getLanguageTemplate, LanguageTemplates } from '../../../utils/language';
import { removeAllSpaces } from '../../../utils/string-utils/string-manipulation';
import CodeEditor from '../../ui/editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const CreationSolution: React.FC = () => {
    const { language, solutionCode, setSolutionCode } = useExerciseCreationContext();

    const handleChange = (value: string | undefined) => setSolutionCode(value ?? '');

    return (
        <CreationSectionContainer title="Solution Code" id={CreationSection.SOLUTION_CODE}>
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
    const templatesTrimmed = Object.values(LanguageTemplates).map((temp) =>
        removeAllSpaces(temp),
    );
    const solutionCodeTrimmed = removeAllSpaces(solutionCode);

    if (templatesTrimmed.includes(solutionCodeTrimmed)) return getLanguageTemplate(language);
    return solutionCode;
}

export default CreationSolution;
