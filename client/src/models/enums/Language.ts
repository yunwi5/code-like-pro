export enum Language {
    PYTHON = 'Python',
    JAVASCRIPT = 'Javascript',
    TYPESCRIPT = 'Typescript',
    SWIFT = 'Swift',
    KOTLIN = 'Kotlin',
    JAVA = 'Java',
    CPP = 'C++',
    CSHARP = 'C#',
    C = 'C',
    GO = 'Go',
}

export const LanguageList = Object.freeze(Object.values(Language).sort());
