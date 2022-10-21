import { IUser } from '..';
import { Language } from '../../enums';

// IUser with more information like list of languages the user used.
export interface IUserInfo extends IUser {
    languages: Language[]; // list of languages the user has used for solving exercises.
    solvedExercises: number;
    createdExercises: number;
}
