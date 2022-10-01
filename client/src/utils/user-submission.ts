import { IUserSubmission, IUserSubmissionPopulated } from '../models/interfaces';
import { DateTime } from 'luxon';
import { round } from './number';

// Create submission map for user exercise attempt.
// Key should be ExerciseID and the value is the submission object.
export function createSubmissionMap(submissions: IUserSubmissionPopulated[]) {
    const submissionMap: { [key: string]: IUserSubmissionPopulated } = {};
    submissions.forEach((sub) => {
        submissionMap[sub.exercise._id] = sub;
    });
    return submissionMap;
}

// Retrieve the most recent submission based on the datetime.
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

// Calculate statistics for correct count and correct rate of user submissions list.
export function getSubmissionStats(
    submissions: IUserSubmission[] | IUserSubmissionPopulated[],
) {
    const total = submissions.length;
    let correctCount = 0;
    submissions.forEach((submission) => {
        if (submission.correct) correctCount++;
    });
    const correctRate = round((correctCount / (total || 1)) * 100, 1).toFixed(1);
    return { correctRate, correctCount, total };
}
