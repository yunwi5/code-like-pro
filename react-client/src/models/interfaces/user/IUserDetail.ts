import { IExerciseWithId, IUserSubmissionPopulated } from '..';

// Interface for full user detail. Every object attribute is populated.
export interface IUserDetail {
    _id: string;
    name: string;
    email: string;
    description: string;
    createdAt: string; // ISO datetime format
    picture?: string;
    liked: IExerciseWithId[]; // list of liked exercises by the user
    exercises: IExerciseWithId[]; // list of exercises created by the user
    submissions: IUserSubmissionPopulated[];
}
