import { Difficulty, Language, ProgrammingTopic } from '../../enums';
import { IUser } from '../IUser';

// Interface that stores the information for exercise cards on the browsing page.
// Different from IExercise object that is used on exercise creation page and attemp page.
export interface IExerciseCard {
    _id: string;
    name: string;
    language: Language;
    topic: ProgrammingTopic;
    difficulty: Difficulty;
    correctRate: number;
    stars: number; // favorite count
    reports: number; // report count
    tags: string[];
    author?: IUser;
}
