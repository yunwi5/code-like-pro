// Only languages that are allowed in this app.
const Language = {
    PYTHON: 'python3',
    C: 'c',
    CPP: 'cpp',
    JAVA: 'java',
    NODE_JS: 'nodejs',
    PHP: 'php',
    PASCAL: 'pascal',
};

// We will not support python2 and Octave
const LanguageList = ['python3', 'c', 'cpp', 'java', 'nodejs', 'php', 'pascal'];

// Only difficulties that are allowed in this app.
const Difficulty = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
    EXPERT: 'Expert',
};

const DifficultyList = Object.values(Difficulty);

module.exports = { Language, LanguageList, Difficulty, DifficultyList };
