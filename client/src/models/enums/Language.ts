export enum Language {
    PYTHON = 'Python',
    JAVASCRIPT = 'Javascript',
    TYPESCRIPT = 'Typescript',
    SWIFT = 'Swift',
    JAVA = 'Java',
    CPP = 'C++',
    CSHARP = 'C#',
    C = 'c',
    GO = 'Go',
}

export const LanguageList = Object.freeze(Object.values(Language).sort());
