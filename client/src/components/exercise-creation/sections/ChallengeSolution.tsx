import React from 'react';
import { CreationSection, Language } from '../../../models/enums';
import CodeEditor from '../../ui/editor/code-editor/CodeEditor';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeSolution: React.FC = () => {
    const handleChange = (value: string | undefined) => {
        console.log(value);
    };

    return (
        <CreationSectionContainer title="Solution Code" id={CreationSection.SOLUTION_CODE}>
            <CodeEditor onChange={handleChange} height={'22rem'} />
        </CreationSectionContainer>
    );
};

export default ChallengeSolution;
