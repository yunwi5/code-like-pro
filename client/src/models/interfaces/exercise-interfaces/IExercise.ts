import { ITestCase } from '..';
import { Difficulty, Language, ProgrammingTopic } from '../../enums';
import { IUser } from '../IUser';

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
}

export interface IExerciseWithId extends IExercise {
    _id: string;
}
