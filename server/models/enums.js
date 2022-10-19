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

// Badge categories
const BadgeCategory = {
    CREATION: 'Creation',
    SOLVING: 'Solving',
    SHOWCASE: 'Showcase',
};

const BadgeCategoryList = Object.values(BadgeCategory);

// Badge rarity options
const BadgeRarityOptions = { N: 'N', R: 'R', SR: 'SR', UR: 'UR' };

const BadgeRarityOptionsList = Object.values(BadgeRarityOptions);

// Badge available amount specifications (e.g. solving 10+ exercises)
const BadgeAmountOptions = {
    N: 1,
    R: 5,
    SR: 10,
    UR: 50,
};

const BadgeAmountOptionsList = Object.values(BadgeAmountOptions);

module.exports = {
    Language,
    LanguageList,
    Difficulty,
    DifficultyList,
    BadgeCategory,
    BadgeCategoryList,
    BadgeRarityOptions,
    BadgeRarityOptionsList,
    BadgeAmountOptions,
    BadgeAmountOptionsList,
};
