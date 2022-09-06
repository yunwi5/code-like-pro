import { Difficulty } from '../models/enums';

// Display different color for different difficulties.
// Function for UI design purpose.
export function getDifficultyColorClass(difficulty: Difficulty) {
    switch (difficulty) {
        case Difficulty.EASY:
            return 'text-emerald-400 border-2 border-emerald-400 hover:text-emerald-50 hover:bg-emerald-400';
        case Difficulty.MEDIUM:
            return 'text-sky-400 border-2 border-sky-400 hover:text-sky-50 hover:bg-sky-400';
        case Difficulty.HARD:
            return 'text-rose-400 border-2 border-rose-400 hover:text-rose-50 hover:bg-rose-400';
        case Difficulty.EXPERT:
            return 'text-stone-500 border-2 border-stone-500 hover:text-stone-50 hover:bg-stone-500';
        default:
            return 'text-main-400 border-2 border-main-400 hover:text-main-50 hover:bg-main-400';
    }
}

// This is used for sorting exercises by difficulty.
// Easy is given the lowest value so that easy exercises come first in ascending order.
export function mapDifficultyToNumericValue(difficulty: Difficulty) {
    switch (difficulty) {
        case Difficulty.EASY:
            return 1;
        case Difficulty.MEDIUM:
            return 2;
        case Difficulty.HARD:
            return 3;
        case Difficulty.EXPERT:
            return 4;
        default:
            return -1;
    }
}
