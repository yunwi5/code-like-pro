import { IExerciseCard, IExerciseWithId } from '../../models/interfaces';
import { getOverallDifficulty } from '../difficulty.util';

// Optional overriding attributes such as giving the authorized access.
type Attributes = { isAuthorized?: boolean; author?: { _id: string; name: string } };

export function mapExerciseToExerciseCard(
  exercise: IExerciseWithId,
  attributes: Attributes = {},
): IExerciseCard {
  const exerciseCard: IExerciseCard = {
    _id: exercise._id,
    name: exercise.name,
    reports: exercise.reports.length,
    stars: exercise.liked.length,
    prompt: exercise.prompt,
    language: exercise.language,
    // Derived overall difficulty rating
    difficulty: getOverallDifficulty(exercise).overallDifficulty,
    createdAt: exercise.createdAt,
    tags: exercise.tags,
    author: exercise.author,
    ...attributes,
  };
  return exerciseCard;
}

export function mapExercisesToExerciseCards(
  exercises: IExerciseWithId[],
  attributes?: Attributes,
): IExerciseCard[] {
  return exercises.map((ex) => mapExerciseToExerciseCard(ex, attributes));
}
