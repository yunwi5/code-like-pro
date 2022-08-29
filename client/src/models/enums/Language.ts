export enum Language {
    PYTHON = 'Python',
    JAVASCRIPT = 'Javascript',
    JAVA = 'Java',
    CPP = 'C++',
    C = 'C',
    PHP = 'Php',
    PASCAL = 'Pascal',
    // Jobe server does not support C# and TypeScript code execution.
    // CSHARP = 'C#',
    // TYPESCRIPT = 'Typescript',
}

export const LanguageList = Object.freeze(Object.values(Language).sort());
