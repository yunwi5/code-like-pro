import React from 'react';
import { Language } from '../../../models/enums';
import { getLanguageIcon, prettierLanguageName } from '../../../utils/language';
import HoveringLabel from '../tooltip/HoveringLabel';

interface Props {
    language: Language;
    className?: string;
    size?: string;
}

// Language icon label. When hovering, the language name will appear below.
const LanguageIcon: React.FC<Props> = ({ language, className = '', size }) => {
    return (
        <HoveringLabel label={prettierLanguageName(language)} className={className}>
            {getLanguageIcon(language, { width: size ?? '30px', height: size ?? '30px' })}
        </HoveringLabel>
    );
};

export default LanguageIcon;
