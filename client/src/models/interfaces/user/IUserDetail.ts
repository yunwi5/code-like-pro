import { IExerciseWithId, IUserSubmissionPopulated } from '..';

export interface IUserDetail {
    _id: string;
    name: string;
    email: string;
    createdAt: string | Date;
    pictureUrl?: string;
    liked: IExerciseWithId[]; // list of liked exercises by the user
    exercises: IExerciseWithId[]; // list of exercises created by the user
    submissions: IUserSubmissionPopulated[];
}
