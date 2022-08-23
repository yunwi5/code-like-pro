import React from 'react';
import { CreationSection, Language } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import CodeEditor from '../../ui/editor/code-editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeSolution: React.FC = () => {
    const { language } = useExerciseCreationContext();

    const handleChange = (value: string | undefined) => {
        console.log(value);
    };

    return (
        <CreationSectionContainer title="Solution Code" id={CreationSection.SOLUTION_CODE}>
            <CodeEditor language={language} onChange={handleChange} height={'22rem'} />
        </CreationSectionContainer>
    );
};

export default ChallengeSolution;
