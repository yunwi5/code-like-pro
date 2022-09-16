import React from 'react';
import { Language } from '../../../models/enums';
import { getLanguageIcon, prettierLanguageName } from '../../../utils/language';
import HoveringLabel from './HoveringLabel';

interface Props {
    language: Language;
    className?: string;
}

// Language icon label. When hovering, the language name will appear below.
const LanguageLabel: React.FC<Props> = ({ language, className = '' }) => {
    return (
        <HoveringLabel label={prettierLanguageName(language)} className={className}>
            {getLanguageIcon(language, { width: '30px', height: '30px' })}
        </HoveringLabel>
    );
};

export default LanguageLabel;
