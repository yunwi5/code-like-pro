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
export function mapJobeLangCodeToAppLanguage(langCode: string): string {
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

export function languageCodesToReadableNames(
    langCodes: string[] | readonly string[],
): string[] {
    return langCodes.map((lang) => mapJobeLangCodeToAppLanguage(lang as Language));
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
    return languageCodesToReadableNames(Array.from(usedLanguages));
}
