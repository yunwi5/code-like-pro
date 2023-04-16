import React from 'react';

import { Language } from '../../../models/enums';
import { getLanguageIcon, prettierLanguageName } from '../../../utils/language.util';

const LanguageLabel: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <div className="flex flex-col items-center ml-2">
      <span className="text-sm">
        {getLanguageIcon(language, {
          width: '33px',
          height: '33px',
        })}
      </span>
      <span className="text-sm">{prettierLanguageName(language)}</span>
    </div>
  );
};

export default LanguageLabel;
