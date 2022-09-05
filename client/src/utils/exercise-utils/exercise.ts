import { IExerciseCard, IExerciseWithId } from '../../models/interfaces';

// Optional overriding attributes such as giving the authorized access.
type Attributes = { isAuthorized?: boolean; author?: { _id: string; name: string } };

export function mapExerciseToExerciseCard(
    exercise: IExerciseWithId,
    attributes: Attributes = {},
): IExerciseCard {
    const exerciseCard: IExerciseCard = {
        _id: exercise._id,
        name: exercise.name,
        topic: exercise.topic,
        correctRate: 0, // for now we do not have correctness data yet
        reports: exercise.reports.length,
        stars: exercise.liked.length,
        prompt: exercise.prompt,
        language: exercise.language,
        difficulty: exercise.difficulty,
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
