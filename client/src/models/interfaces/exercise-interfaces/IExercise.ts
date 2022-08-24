import { ITestCase } from '..';
import { Difficulty, Language, ProgrammingTopic } from '../../enums';

export interface IExercise {
    name: string;
    language: Language;
    topic: ProgrammingTopic;
    difficulty: Difficulty;
    prompt: string;
    solutionCode: string;
    startingTemplate: string;
    tags: string[];
    testCases: ITestCase[];
}
