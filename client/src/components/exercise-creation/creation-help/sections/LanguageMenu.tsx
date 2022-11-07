import React from 'react';
import { Language, LanguageList } from '../../../../models/enums';
import { getLanguageIcon, prettierLanguageName } from '../../../../utils/language';

interface Props {
    selectedLanguage: Language;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<Language>>;
    className?: string;
}

const LanguageMenu: React.FC<Props> = ({
    selectedLanguage,
    setSelectedLanguage,
    className = '',
}) => {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {LanguageList.map((lang) => (
                <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`flex-center gap-2 px-3 py-[0.3rem] rounded-full bg-white hover:text-white hover:!bg-blue-500 shadow-md ${
                        selectedLanguage === lang ? '!bg-blue-200 brightness-110' : ''
                    }`}
                >
                    {getLanguageIcon(lang, { width: '27px', height: '27px' })}
                    <span>{prettierLanguageName(lang)}</span>
                </button>
            ))}
        </div>
    );
};

export default LanguageMenu;
