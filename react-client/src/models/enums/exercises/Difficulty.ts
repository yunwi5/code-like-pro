export enum Difficulty {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard',
    EXPERT = 'Expert',
}

export const DifficultyList: readonly Difficulty[] = Object.freeze(Object.values(Difficulty));
