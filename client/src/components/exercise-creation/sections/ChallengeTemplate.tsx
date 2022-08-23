import React from 'react';
import { CreationSection, Language } from '../../../models/enums';
import CodeEditor from '../../ui/editor/code-editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeTemplate: React.FC = () => {
    const handleChange = (value: string | undefined) => {
        console.log(value);
    };

    return (
        <CreationSectionContainer
            title="Starting Template"
            id={CreationSection.STARTING_TEMPLATE}
        >
            <CodeEditor onChange={handleChange} height={'22rem'} />
        </CreationSectionContainer>
    );
};

export default ChallengeTemplate;
