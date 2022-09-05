import { IUserSubmissionPopulated } from '../models/interfaces';

export function createSubmissionMap(submissions: IUserSubmissionPopulated[]) {
    const submissionMap: { [key: string]: IUserSubmissionPopulated } = {};
    submissions.forEach((sub) => {
        submissionMap[sub._id] = sub;
    });
    return submissionMap;
}
