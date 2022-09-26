export type { ITestCase as ITestCase, ITestCaseProps } from './exercise/ITestCase';
// Exercise related interfaces
export type { IExercise, IExerciseWithId } from './exercise/IExercise';
export type { IExerciseCard } from './exercise/IExerciseCard';
export type { ITestOutput } from './exercise/ITestOutput';
export type { IIssueReport } from './exercise/IIssueReport';

// User related interfaces
export type { IUser } from './user/IUser';
export type { IUserDetail } from './user/IUserDetail';
export type { IUserSubmission, IUserSubmissionPopulated } from './user/IUserSubmission';

// Showcae related interfaces
export type { IVote } from './showcase/IVote';
export type { IShowCase } from './showcase/IShowCase';
export type { IComment } from './showcase/IComment';

// Ranking related interfaces
export * from './ranking/IRanking';

// Context types
export type {
    IExerciseCreationContext,
    IReadyStatus,
} from './context/IExerciseCreationContext';
export type { IUserContext } from './context/IUserContext';

// Data Analysis interfaces
export type { IChartData } from './analysis/IChartData';
