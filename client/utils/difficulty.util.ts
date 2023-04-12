import { Difficulty, DifficultyList } from '../models/enums';
import { IDifficultyVote, IExerciseWithId } from '../models/interfaces';
import { round } from './number.util';

export const MAX_DIFFICULTY_VALUE = DifficultyList.length;

// Display different color for different difficulties.
// Function for UI design purpose.
export function getDifficultyBtnClass(difficulty: Difficulty) {
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

// When the difficulty filter is active, apply these active classes for each difficulty for different styles than non-active classes.
export function getDifficultyActiveClass(difficulty: Difficulty) {
  switch (difficulty) {
    case Difficulty.EASY:
      return '!text-emerald-50 !bg-emerald-400';
    case Difficulty.MEDIUM:
      return '!text-sky-50 !bg-sky-400';
    case Difficulty.HARD:
      return '!text-rose-50 !bg-rose-400';
    case Difficulty.EXPERT:
      return '!text-stone-50 !bg-stone-500';
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
      return 0;
  }
}

export function mapNumericValueToDifficulty(value: number) {
  const rounded = Math.round(value);
  switch (rounded) {
    case 1:
      return Difficulty.EASY;
    case 2:
      return Difficulty.MEDIUM;
    case 3:
      return Difficulty.HARD;
    case 4:
      return Difficulty.EXPERT;
    default:
      return Difficulty.EASY;
  }
}

export function getAverageDifficultyByRatings(exercise: IExerciseWithId) {
  const difficultyVotes: IDifficultyVote[] = exercise.difficultyVotes || [];

  const averageRating =
    difficultyVotes.reduce((acc, curr) => acc + mapDifficultyToNumericValue(curr.type), 0) /
    difficultyVotes.length;

  const averageDifficulty = mapNumericValueToDifficulty(averageRating);
  const averageRatingRounded = round(averageRating, 1);
  return { averageDifficulty, averageRating, averageRatingRounded };
}

export function getOverallDifficulty(exercise: IExerciseWithId) {
  const { averageRating } = getAverageDifficultyByRatings(exercise);
  const creatorRating = mapDifficultyToNumericValue(exercise.difficulty);

  const overallRating = creatorRating * 0.25 + averageRating * 0.75;
  const overallDifficulty = mapNumericValueToDifficulty(overallRating);
  const overallRatingRounded = round(overallRating, 1);

  return { overallDifficulty, overallRating, overallRatingRounded };
}
