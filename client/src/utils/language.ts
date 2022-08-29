import { Language } from '../models/enums';

export function mapLanguageToJobeLangCode(language: Language) {
    switch (language) {
        case Language.CPP:
            return 'cpp';
        case Language.PYTHON:
            return 'python3';
        case Language.JAVASCRIPT:
            return 'nodejs';
        // All other languages codes are just our client style names in lowercase.
        default:
            return language.toLowerCase();
    }
}

export function mapJobeLangCodeToAppLanguage(langCode: string): Language {
    switch (langCode.trim()) {
        case 'c':
            return Language.C;
        case 'cpp':
            return Language.CPP;
        case 'python3':
            return Language.PYTHON;
        case 'java':
            return Language.JAVA;
        case 'nodejs':
            return Language.JAVASCRIPT;
        case 'octave':
            return Language.OCTAVE;
        case 'php':
            return Language.PHP;
        case 'pascal':
            return Language.PASCAL;
        default:
            return Language.PYTHON;
    }
}
