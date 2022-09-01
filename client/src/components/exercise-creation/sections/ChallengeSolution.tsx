import React from 'react';
import { CreationSection } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import CodeEditor from '../../ui/editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeSolution: React.FC = () => {
    const { language, solutionCode, setSolutionCode } = useExerciseCreationContext();

    const handleChange = (value: string | undefined) => setSolutionCode(value ?? '');

    return (
        <CreationSectionContainer title="Solution Code" id={CreationSection.SOLUTION_CODE}>
            <CodeEditor
                language={language}
                onChange={handleChange}
                value={solutionCode}
                height={'22rem'}
            />
        </CreationSectionContainer>
    );
};

export default ChallengeSolution;
