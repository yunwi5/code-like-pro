import {
    CIcon,
    CppIcon,
    JavaIcon,
    JavaScriptIcon,
    PascalIcon,
    PhpIcon,
    PythonIcon,
} from '../assets/svg-icons/language-svgs';
import { Language } from '../models/enums';
import { IUserSubmissionPopulated } from '../models/interfaces';

// Map JOBE server language code to user-readable app language name.
// Example: cpp -> C++, nodejs -> Node JS
export function prettierLanguageName(langCode: string): string {
    if (!langCode.trim()) return 'Text';

    switch (langCode.trim()) {
        case Language.CPP:
            return 'C++';
        case Language.PYTHON:
            return 'Python';
        case Language.JAVASCRIPT:
            return 'Node Js';
        default:
            return langCode[0].toUpperCase() + langCode.substring(1);
    }
}

export function prettierLanguageNames(langCodes: string[] | readonly string[]): string[] {
    return langCodes.map((lang) => prettierLanguageName(lang as Language));
}

// Find the icon for each language.
type SvgParams = { width?: string; height?: string; className?: string };
export function getLanguageIcon(language: Language, params?: SvgParams) {
    switch (language) {
        case Language.C:
            return <CIcon {...params} />;
        case Language.CPP:
            return <CppIcon {...params} />;
        case Language.PYTHON:
            return <PythonIcon {...params} />;
        case Language.JAVASCRIPT:
            return <JavaScriptIcon {...params} />;
        // All other languages codes are just our client style names in lowercase.
        case Language.JAVA:
            return <JavaIcon {...params} />;
        case Language.PHP:
            return <PhpIcon {...params} />;
        case Language.PASCAL:
            return <PascalIcon {...params} />;
    }
}

export function getUsedLanguagesByUser(submissions: IUserSubmissionPopulated[]) {
    const usedLanguages = new Set<Language>();
    for (let sub of submissions) {
        usedLanguages.add(sub.exercise.language);
    }
    return prettierLanguageNames(Array.from(usedLanguages));
}

// Provide starting tmeplate code for exercise creators.
export const LanguageTemplates: { [key: string]: string } = {
    [Language.C]:
        '#include <stdio.h>\n\n // Please do not define a main function by your self.\n// We will define the main function automaticlaly beind the scene to execute your code!\n// Write your function or class here.\n',
    [Language.CPP]:
        '#include <iostream>\nusing namespace std;\n\n// Please do not define a main function by your self.\n// We will define the main function automaticlaly beind the scene to execute your code!\n// Write your function or class here.\n',
    [Language.JAVA]:
        'import java.util.*;\n\n// Please write your solution method inside the Main class\nclass Main {\n\n}\n',
    [Language.JAVASCRIPT]: '// Write your programming solution here.',
    [Language.PYTHON]: '# Write your programming solution here.',
    others: '',
};
// Get starting language template for the user who is going to create an exercise.
export function getLanguageTemplate(language: Language) {
    return LanguageTemplates[language] || '';
}
