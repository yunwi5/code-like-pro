import { IExerciseWithId } from '../exercise/IExercise';

export interface IUserSubmission {
  _id: string;
  code: string;
  correct: boolean;
  user: string; // user id unpopulated
  exercise: string; // exercise id unpopulated
  postedAt: string; // ISO date format
}

// User submission populated with exercise data.
export interface IUserSubmissionPopulated {
  _id: string;
  code: string;
  correct: boolean;
  user: string; // user id unpopulated
  postedAt: string; // ISO date format
  exercise: IExerciseWithId; // exercise data is populated
}
