export enum SubmissionStatus {
  UNATTEMPTED = 'Unattempted',
  CORRECT = 'Correct',
  INCORRECT = 'Incorrect',
}

export const SubmissionStatusList = Object.freeze(Object.values(SubmissionStatus));
