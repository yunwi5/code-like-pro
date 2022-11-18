import { IComment, ITestCase } from '..';
import { Difficulty, Language } from '../../enums';
import { IUser } from '../user/IUser';

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
    author?: IUser;
    createdAt: string; // ISO date for exercise creation
    liked: string[]; // list of user ids who liked the exercise unpopulated
    reports: string[]; // list of report ids unpopulated
}

export interface IExerciseWithId extends IExercise {
    _id: string;
    comments: IComment[] | string[];
    showCases: string[];
}
