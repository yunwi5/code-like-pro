export type { ITestCase, ITestCaseProps } from './exercise/ITestCase';
// Exercise related interfaces
export type { IExercise, IExerciseWithId } from './exercise/IExercise';
export type { IExerciseCard } from './exercise/IExerciseCard';
export type { ITestResult } from './exercise/ITestResult';
export type { IIssueReport } from './exercise/IIssueReport';

// User related interfaces
export type { IUser } from './user/IUser';
export type { IUserDetail } from './user/IUserDetail';
export type { IUserSubmission, IUserSubmissionPopulated } from './user/IUserSubmission';

// Context types
export type {
    IExerciseCreationContext,
    IReadyStatus,
} from './context/IExerciseCreationContext';
export type { IUserContext } from './context/IUserContext';
