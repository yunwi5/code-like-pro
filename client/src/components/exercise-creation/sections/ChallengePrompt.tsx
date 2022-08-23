import React, { useState } from 'react';
import { CreationSection } from '../../../models/enums';
import TextEditor from '../../ui/editor/text-editor/TextEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengePrompt: React.FC = () => {
    const [value, setValue] = useState<string>('');

    const handleChange = (newValue: string) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <CreationSectionContainer title="Prompt" id={CreationSection.PROMPT}>
            <TextEditor onChange={handleChange} value={value} />
        </CreationSectionContainer>
    );
};

export default ChallengePrompt;
