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

// Map app language name to jobe server code for code execution on the backend.
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

// Map JOBE server language code back to app language name
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
        case 'php':
            return Language.PHP;
        case 'pascal':
            return Language.PASCAL;
        default:
            return Language.PYTHON;
    }
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
