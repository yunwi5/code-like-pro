import { IUser } from '..';
import { Language } from '../../enums';

// IUser with more information like list of languages the user used.
export interface IUserInfo extends IUser {
    description: string;
    languages: Language[]; // list of languages the user has used for solving exercises.
    picture?: string; // user profile picture
    createdAt: string; // ISO datetime format

    solvedExercises: number;
    createdExercises: number;
    showCases: number;

    liked: string[]; // list of exercise ids that user liked
}
