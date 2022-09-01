import { AppProperty } from '../constants/app';
import { IExercise, IExerciseWithId, IIssueReport } from '../models/interfaces';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/exercise`;

export async function getExercises() {
    return await getRequest<IExerciseWithId[]>({ url: API_DOMAIN });
}

export async function getExerciseById(id: string) {
    return await getRequest<IExerciseWithId | undefined>({ url: `${API_DOMAIN}/${id}` });
}

export async function postExercise(exercise: IExercise) {
    return await postRequest<IExerciseWithId>({ url: API_DOMAIN, body: exercise });
}

export async function putExercise(id: string, updatedExercise: IExercise) {
    return await putRequest<IExerciseWithId>({
        url: `${API_DOMAIN}/${id}`,
        body: updatedExercise,
    });
}

export async function deleteExercise(id: string) {
    return await deleteRequest<{ message: string }>({ url: `${API_DOMAIN}/${id}` });
}

export async function reportExercise(id: string, reportBody: IIssueReport) {
    return await postRequest<IIssueReport>({
        url: `${API_DOMAIN}/${id}/report`,
        body: reportBody,
    });
}
