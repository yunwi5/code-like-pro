import { IComment, ITestCase } from '..';
import { Difficulty, Language, ProgrammingTopic } from '../../enums';
import { IUser } from '../user/IUser';

export interface IExercise {
    _id?: string;
    name: string;
    language: Language;
    topic: ProgrammingTopic;
    difficulty: Difficulty;
    prompt: string;
    solutionCode: string;
    startingTemplate: string;
    tags: string[];
    testCases: ITestCase[];
    author?: IUser;
    createdAt: string; // ISO date for exercise creation
    liked: string[]; // list of user ids who liked the exercise unpopulated
    reports: string[]; // list of report ids unpopulated
}

export interface IExerciseWithId extends IExercise {
    _id: string;
    comments: IComment[] | string[];
}
