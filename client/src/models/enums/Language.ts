export enum Language {
    PYTHON = 'Python',
    JAVASCRIPT = 'Javascript',
    TYPESCRIPT = 'Typescript',
    JAVA = 'Java',
    CPP = 'C++',
    CSHARP = 'C#',
    C = 'C',
    PHP = 'Php',
    OCTAVE = 'Octave',
    PASCAL = 'Pascal',
}

export const LanguageList = Object.freeze(Object.values(Language).sort());
