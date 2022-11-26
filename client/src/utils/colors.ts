import {
    Difficulty,
    Language,
    ProgrammingTopic,
    SubmissionStatus,
} from '../models/enums';

const ROSE_300 = '#fda4af';
const ORANGE_300 = '#fdba74';
const YELLOW_300 = '#fde047';
const EMERALD_300 = '#6ee7b7';
const SKY_300 = '#7dd3fc';
const BLUE_300 = '#93c5fd';
const STONE_300 = '#a8a29e';
const GRAY_300 = '#d1d5db';
const SLATE_300 = '#cbd5e1';
const VIOLET_300 = '#c4b5fd';
const PURPLE_300 = '#d8b4fe';
const FUCHSIA_300 = '#f0abfc';
const PINK_300 = '#f9a8d4';

const ROSE_600 = '#f43f5e';
const EMERALD_600 = '#059669';
const SKY_600 = '#0284c7';
const BLUE_600 = '#2563eb';
const STONE_600 = '#44403c';

// Map difficulties to hex colors for data analysis
export const DifficultyColorMap = {
    [Difficulty.EASY]: EMERALD_300,
    [Difficulty.MEDIUM]: SKY_300,
    [Difficulty.HARD]: ROSE_300,
    [Difficulty.EXPERT]: STONE_300,
};

export const DifficultyTextColorMap = {
    [Difficulty.EASY]: EMERALD_600,
    [Difficulty.MEDIUM]: SKY_600,
    [Difficulty.HARD]: ROSE_600,
    [Difficulty.EXPERT]: STONE_600,
};

export const LanguageColorMap = {
    [Language.C]: SKY_300,
    [Language.CPP]: BLUE_300,
    [Language.JAVA]: PINK_300,
    [Language.JAVASCRIPT]: YELLOW_300,
    [Language.PYTHON]: SLATE_300,
    // [Language.PASCAL]: ORANGE_300,
    // [Language.PHP]: VIOLET_300,
};

export const StatusColorMap = {
    [SubmissionStatus.CORRECT]: EMERALD_300,
    [SubmissionStatus.INCORRECT]: ROSE_300,
};

export const ProgrammingTopicColorMap = {
    [ProgrammingTopic.ARITHMETIC]: '',
};

export const ExerciseAttemptColor = {
    fillColor: `${SKY_300}77`,
    outlineColor: SKY_600,
};

export const ExerciseCreationColor = {
    fillColor: `${BLUE_300}77`,
    outlineColor: BLUE_600,
};

const LightColorList = [
    ROSE_300,
    ORANGE_300,
    YELLOW_300,
    EMERALD_300,
    SKY_300,
    BLUE_300,
    STONE_300,
    GRAY_300,
    SLATE_300,
    VIOLET_300,
    PURPLE_300,
    FUCHSIA_300,
    PINK_300,
];

// Return the light color based on the index. Used for programming topics.
export function getLightColorByIndex(index: number) {
    const colorIndex = index % LightColorList.length;
    return LightColorList[colorIndex];
}
