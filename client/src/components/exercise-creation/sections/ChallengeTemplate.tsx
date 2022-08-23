import React from 'react';
import { CreationSection, Language } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import CodeEditor from '../../ui/editor/code-editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeTemplate: React.FC = () => {
    const { language } = useExerciseCreationContext();

    const handleChange = (value: string | undefined) => {
        console.log(value);
    };

    return (
        <CreationSectionContainer
            title="Starting Template"
            id={CreationSection.STARTING_TEMPLATE}
        >
            <CodeEditor language={language} onChange={handleChange} height={'22rem'} />
        </CreationSectionContainer>
    );
};

export default ChallengeTemplate;
