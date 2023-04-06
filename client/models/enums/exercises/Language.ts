export enum Language {
    PYTHON = 'python3',
    JAVASCRIPT = 'nodejs',
    JAVA = 'java',
    CPP = 'cpp',
    C = 'c',
    // PHP = 'php',
    // PASCAL = 'pascal',
    // Jobe server does not support C# and TypeScript code execution.
}

export const LanguageList = Object.freeze(Object.values(Language).sort());
