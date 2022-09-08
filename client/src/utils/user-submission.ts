import { IUserSubmissionPopulated } from '../models/interfaces';
import { DateTime } from 'luxon';

// Create submission map for user exercise attempt.
// Key should be ExerciseID and the value is the submission object.
export function createSubmissionMap(submissions: IUserSubmissionPopulated[]) {
    const submissionMap: { [key: string]: IUserSubmissionPopulated } = {};
    submissions.forEach((sub) => {
        submissionMap[sub.exercise._id] = sub;
    });
    return submissionMap;
}

export function getMostRecentSubmission(
    submissions: IUserSubmissionPopulated[],
): IUserSubmissionPopulated | null {
    let mostRecentSubmission: IUserSubmissionPopulated | null = null;
    let mostRecentDateTime: DateTime | null = null;
    submissions.forEach((sub) => {
        let submissionDt = DateTime.fromISO(sub.postedAt);
        if (mostRecentDateTime == null || submissionDt > mostRecentDateTime) {
            mostRecentDateTime = submissionDt;
            mostRecentSubmission = sub;
        }
    });
    return mostRecentSubmission;
}
