import { IExercise, IExerciseCard, IExerciseWithId } from '../../models/interfaces';

export function mapExerciseToExerciseCard(exercise: IExerciseWithId): IExerciseCard {
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
    };
    return exerciseCard;
}

export function mapExercisesToExerciseCards(exercises: IExerciseWithId[]): IExerciseCard[] {
    return exercises.map((ex) => mapExerciseToExerciseCard(ex));
}
