import { AppProperty } from "../constants/app";
import {
  IComment,
  IExercise,
  IExerciseWithId,
  IIssueReport,
  IShowCase,
  IUserSubmission,
} from "../models/interfaces";
import { deleteRequest, getRequest, postRequest, putRequest } from "./requests";

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/exercise`;

export async function getExercises() {
  return await getRequest<IExerciseWithId[]>({ url: API_DOMAIN });
}

export async function getExerciseById(id: string) {
  return await getRequest<IExerciseWithId | undefined>({
    url: `${API_DOMAIN}/${id}`,
  });
}

export async function postExercise(exercise: IExercise) {
  return await postRequest<IExerciseWithId>({
    url: API_DOMAIN,
    body: exercise,
  });
}

export async function putExercise(id: string, updatedExercise: IExercise) {
  return await putRequest<IExerciseWithId>({
    url: `${API_DOMAIN}/${id}`,
    body: updatedExercise,
  });
}

export async function deleteExercise(id: string) {
  return await deleteRequest<{ message: string }>({
    url: `${API_DOMAIN}/${id}`,
  });
}

// GET: submission history of an exercise as a UserSubmission[]
export async function getExerciseSubmissions(id: string) {
  return await getRequest<IUserSubmission[]>({
    url: `${API_DOMAIN}/${id}/submission`,
  });
}

export async function reportExerciseRequest(
  id: string,
  reportBody: IIssueReport
) {
  return await postRequest<IIssueReport>({
    url: `${API_DOMAIN}/${id}/report`,
    body: reportBody,
  });
}

<<<<<<< HEAD
export function likeExerciseRequest(id: string) {
    return getRequest<IExercise>({ url: `${API_DOMAIN}/${id}/like` });
}

// POST: post user showcase solution
type ShowcaeProps = { code: string; description: string };
export function postExerciseShowCase(id: string, showcaseProps: ShowcaeProps) {
    return postRequest<IShowCase>({
        url: `${API_DOMAIN}/${id}/showcase`,
        body: showcaseProps,
    });
=======
export async function likeExerciseRequest(id: string) {
  return await getRequest<IExercise>({ url: `${API_DOMAIN}/${id}/like` });
}

// POST: post user showcase solution
type ShowcaseProps = { code: string; description: string };
export async function postExerciseShowCase(
  id: string,
  showcaseProps: ShowcaseProps
) {
  return await postRequest<IShowCase>({
    url: `${API_DOMAIN}/${id}/showcase`,
    body: showcaseProps,
  });
}

export async function getExerciseShowcase(id: string) {
  return await getRequest<IShowCase[]>({
    url: `${API_DOMAIN}/${id}/showcase`,
  });
>>>>>>> origin/main
}

export async function getExerciseComments(id: string) {
  return await getRequest<IComment[]>({ url: `${API_DOMAIN}/${id}/comment` });
}

export async function postExerciseComment(
  id: string,
  comment: { text: string }
) {
  return await postRequest<IComment>({
    url: `${API_DOMAIN}/${id}/comment`,
    body: comment,
  });
}
