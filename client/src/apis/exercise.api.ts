import { Difficulty } from '../models/enums';
import {
    IComment,
    IExercise,
    IExerciseDraft,
    IExerciseWithId,
    IIssueReport,
    IShowCase,
    ITestCase,
    IUserSubmission,
    IVote,
} from '../models/interfaces';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests.api';

const EXERCISE_API_DOMAIN = '/exercise';
const SHOWCASE_API_DOMAIN = '/showcase';

// fetch exercise list from the backend
export async function getExercises() {
    return await getRequest<IExerciseWithId[]>({ url: EXERCISE_API_DOMAIN });
}

export async function getExerciseById(id: string) {
    return await getRequest<IExerciseWithId | undefined>({
        url: `${EXERCISE_API_DOMAIN}/${id}`,
    });
}

export async function postExercise(exercise: IExerciseDraft) {
    return await postRequest<IExerciseWithId>({
        url: EXERCISE_API_DOMAIN,
        body: exercise,
    });
}

export async function putExercise(id: string, updatedExercise: IExerciseDraft) {
    return await putRequest<IExerciseWithId>({
        url: `${EXERCISE_API_DOMAIN}/${id}`,
        body: updatedExercise,
    });
}

export async function deleteExercise(id: string) {
    return await deleteRequest<{ message: string }>({
        url: `${EXERCISE_API_DOMAIN}/${id}`,
    });
}

//Get top exercises
export async function getTopExercises(amount: number = 3) {
    return await getRequest<IExerciseWithId[]>({
        url: `${EXERCISE_API_DOMAIN}/top?amount=${amount}`,
    });
}

// Merge user custom test cases to existing test cases
export async function postTestCasesMerge(id: string, newTests: ITestCase[]) {
    return await postRequest<{ exercise: IExercise; insertedCount: number }>({
        url: `${EXERCISE_API_DOMAIN}/${id}/test-merge`,
        body: newTests,
    });
}

// GET: submission history of an exercise as a UserSubmission[]
export async function getExerciseSubmissions(id: string) {
    return await getRequest<IUserSubmission[]>({
        url: `${EXERCISE_API_DOMAIN}/${id}/submission`,
    });
}

export type ReportProps = { category: string; description: string };
export async function postExerciseReport(id: string, reportBody: ReportProps) {
    return await postRequest<IIssueReport>({
        url: `${EXERCISE_API_DOMAIN}/${id}/report`,
        body: reportBody,
    });
}

export async function getExerciseReports(id: string) {
    return await getRequest<IIssueReport[]>({
        url: `${EXERCISE_API_DOMAIN}/${id}/report`,
    });
}

export async function likeExerciseRequest(id: string) {
    return await postRequest<IExerciseWithId>({
        url: `${EXERCISE_API_DOMAIN}/${id}/like`,
        body: {},
    });
}

// POST: post user showcase solution
export type ShowcaseProps = { code: string; description: string };
export async function postExerciseShowCase(id: string, showcaseProps: ShowcaseProps) {
    return await postRequest<IShowCase>({
        url: `${EXERCISE_API_DOMAIN}/${id}/showcase`,
        body: showcaseProps,
    });
}

export async function getExerciseShowcases(id: string) {
    return await getRequest<IShowCase[]>({
        url: `${EXERCISE_API_DOMAIN}/${id}/showcase`,
    });
}

export async function getExerciseComments(id: string) {
    return await getRequest<IComment[]>({ url: `${EXERCISE_API_DOMAIN}/${id}/comment` });
}

export async function postExerciseComment(id: string, comment: { text: string }) {
    return await postRequest<IComment>({
        url: `${EXERCISE_API_DOMAIN}/${id}/comment`,
        body: comment,
    });
}

// POST exercise difficulty vote
export async function postExerciseDifficultyVote(id: string, difficulty: Difficulty) {
    return await postRequest<IExerciseWithId>({
        url: `${EXERCISE_API_DOMAIN}/${id}/difficulty-vote`,
        body: { type: difficulty },
    });
}

// POST vote for showcase
export async function postVoteRequest(id: string, vote: { type: 'up' | 'down' }) {
    return await postRequest<IVote>({
        url: `${SHOWCASE_API_DOMAIN}/${id}/vote`,
        body: vote,
    });
}

// DELETE vote for showcase
export function deleteShowcaseVote(id: string) {
    return deleteRequest<IVote>({
        url: `${SHOWCASE_API_DOMAIN}/${id}/vote`,
    });
}

// GET showcase comments
export async function getShowcaseComments(id: string) {
    return await getRequest<IComment[]>({
        url: `${SHOWCASE_API_DOMAIN}/${id}/comment`,
    });
}

export async function postShowcaseComment(id: string, comment: { text: string }) {
    return await postRequest<IComment>({
        url: `${SHOWCASE_API_DOMAIN}/${id}/comment`,
        body: comment,
    });
}
