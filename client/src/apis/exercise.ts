import { AppProperty } from '../constants/app';
import { IExercise, IExerciseWithId, IIssueReport } from '../models/interfaces';
import { mapJobeLangCodeToAppLanguage } from '../utils/language';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/exercise`;

export async function getExercises() {
    return await getRequest<IExerciseWithId[]>({ url: API_DOMAIN });
}

export async function getExerciseById(id: string) {
    const response = await getRequest<IExerciseWithId | undefined>({
        url: `${API_DOMAIN}/${id}`,
    });
    let exerciseData = response.data;
    // Map jobe server language code back to application style name
    if (exerciseData) {
        exerciseData.language = mapJobeLangCodeToAppLanguage(exerciseData?.language);
    }
    return { ...response, data: exerciseData };
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

export async function reportExerciseRequest(id: string, reportBody: IIssueReport) {
    return await postRequest<IIssueReport>({
        url: `${API_DOMAIN}/${id}/report`,
        body: reportBody,
    });
}

export async function likeExerciseRequest(id: string) {
    return await getRequest<IExercise>({ url: `${API_DOMAIN}/${id}/like` });
}
