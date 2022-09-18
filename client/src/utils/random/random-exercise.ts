import { v4 as uuid } from 'uuid';
import { getRandomNumber, getRandomString, randomChoice, randomMultipleChoices } from '.';
import { DifficultyList, LanguageList, ProgrammingTopicList } from '../../models/enums';
import { IExerciseCard } from '../../models/interfaces';
import { randomExerciseNames } from './random-data';

export function createRandomExercise(idx: number) {
    const exercise: IExerciseCard = {
        _id: uuid(),
        name: `${randomChoice(randomExerciseNames)} ${idx + 1}`,
        language: randomChoice(LanguageList),
        difficulty: randomChoice(DifficultyList),
        tags: randomMultipleChoices(ProgrammingTopicList),
        correctRate: getRandomNumber(0, 100),
        reports: getRandomNumber(0, 300),
        stars: getRandomNumber(0, 10000),
        prompt: getRandomString(),
        // Generage a random dummy author.
        author: { _id: Math.random().toString(), name: getRandomString() },
    };
    return exercise;
}

// Create list of random exercises, default to 1000.
export function createRandomExercises(count: number = 1000): IExerciseCard[] {
    return Array(count)
        .fill(null)
        .map((_, idx) => createRandomExercise(idx));
}
