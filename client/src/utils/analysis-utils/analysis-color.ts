import { Difficulty, Language, ProgrammingTopic, SubmissionStatus } from '../../models/enums';

const ROSE_200 = '#fda4af';
const ORANGE_200 = '#fed7aa';
const YELLOW_200 = '#fef08a';
const EMERALD_200 = '#6ee7b7';
const SKY_200 = '#7dd3fc';
const BLUE_200 = '#bfdbfe';
const STONE_200 = '#e7e5e4';
const GRAY_200 = '#e5e7eb';
const SLATE_200 = '#cbd5e1';
const VIOLET_200 = '#ddd6fe';
const PURPLE_200 = '#e9d5ff';
const FUCHSIA_200 = '#f5d0fe';
const PINK_200 = '#fbcfe8';

const SKY_500 = '#0ea5e9';
const BLUE_500 = '#3b82f6';

// Map difficulties to hex colors for data analysis
export const DifficultyColorMap = {
    [Difficulty.EASY]: EMERALD_200,
    [Difficulty.MEDIUM]: SKY_200,
    [Difficulty.HARD]: ROSE_200,
    [Difficulty.EXPERT]: STONE_200,
};

export const LanguageColorMap = {
    [Language.C]: SKY_200,
    [Language.CPP]: BLUE_200,
    [Language.JAVA]: PINK_200,
    [Language.JAVASCRIPT]: YELLOW_200,
    [Language.PYTHON]: SLATE_200,
    [Language.PASCAL]: ORANGE_200,
    [Language.PHP]: VIOLET_200,
};

export const StatusColorMap = {
    [SubmissionStatus.CORRECT]: EMERALD_200,
    [SubmissionStatus.INCORRECT]: ROSE_200,
};

export const ProgrammingTopicColorMap = {
    [ProgrammingTopic.ARITHMETIC]: '',
};

export const ExerciseAttemptColor = {
    backgroundColor: SKY_200,
    borderColor: SKY_500,
};

export const ExerciseCreationColor = {
    backgroundColor: BLUE_200,
    borderColor: BLUE_500,
};

const LightColorList = [
    ROSE_200,
    ORANGE_200,
    YELLOW_200,
    EMERALD_200,
    SKY_200,
    BLUE_200,
    STONE_200,
    GRAY_200,
    SLATE_200,
    VIOLET_200,
    PURPLE_200,
    FUCHSIA_200,
    PINK_200,
];

// Return the light color based on the index. Used for programming topics.
export function getLightColorByIndex(index: number) {
    const colorIndex = index % LightColorList.length;
    return LightColorList[colorIndex];
}

// Used for assigning border classes of the chart data by index.
export function getDarkColorByIndex(index: number) {
    // Implement
}
