import { IComment, IDifficultyVote, ITestCase } from '..';
import { Difficulty, Language } from '../../enums';

export interface IExerciseDraft {
    name: string;
    language: Language;
    difficulty: Difficulty;
    prompt: string;
    solutionCode: string;
    startingTemplate: string;
    tags: string[];
    testCases: ITestCase[];
}

export interface IExercise extends IExerciseDraft {
    _id?: string;
    author: { _id: string; name: string; pictureUrl?: string };
    createdAt: string; // ISO date for exercise creation
    liked: string[]; // list of user ids who liked the exercise unpopulated
    reports: string[]; // list of report ids unpopulated
}

export interface IExerciseWithId extends IExercise {
    _id: string;
    comments: IComment[] | string[];
    showCases: string[];
    difficultyVotes?: IDifficultyVote[];
}
