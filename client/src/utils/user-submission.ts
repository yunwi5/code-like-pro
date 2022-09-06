import { IUserSubmissionPopulated } from '../models/interfaces';

// Create submission map for user exercise attempt.
// Key should be ExerciseID and the value is the submission object.
export function createSubmissionMap(submissions: IUserSubmissionPopulated[]) {
    const submissionMap: { [key: string]: IUserSubmissionPopulated } = {};
    submissions.forEach((sub) => {
        submissionMap[sub.exercise._id] = sub;
    });
    return submissionMap;
}
