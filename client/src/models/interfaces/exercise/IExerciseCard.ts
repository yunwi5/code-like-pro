import { Difficulty, Language, ProgrammingTopic } from '../../enums';

// Interface that stores the information for exercise cards on the browsing page.
// Different from IExercise object that is used on exercise creation page and attemp page.
export interface IExerciseCard {
    _id: string;
    name: string;
    language: Language;
    difficulty: Difficulty;
    correctRate: number;
    stars: number; // favorite count
    reports: number; // report count
    tags: string[];
    createdAt?: Date | string;
    prompt?: string;
    author?: { _id: string; name: string };
    isAuthorized?: boolean; // Authorize the user if the user is a creator. Give edit/delete access.
}
