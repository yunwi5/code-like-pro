import { IExerciseWithId, IUser, IUserSubmissionPopulated } from '..';

// Interface for full user detail. Every object attribute is populated.
export interface IUserDetail extends IUser {
  description: string;
  createdAt: string; // ISO datetime format
  liked: IExerciseWithId[]; // list of liked exercises by the user
  exercises: IExerciseWithId[]; // list of exercises created by the user
  submissions: IUserSubmissionPopulated[];
}
