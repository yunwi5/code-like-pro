import { AppProperty } from '../../constants/app';
import { IExercise } from '../../models/interfaces';
import { getRequest, postRequest, putRequest } from '../requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/exercise`;

export async function postExercise(exercise: IExercise) {
    return await postRequest({ url: API_DOMAIN, body: exercise });
}

export async function getExerciseById(id: string) {
    return await getRequest({ url: `${API_DOMAIN}/${id}` });
}

export async function putExercise(id: string, updatedExercise: IExercise) {
    console.log('Sending exercise PUT request');
    return await putRequest({ url: `${API_DOMAIN}/${id}`, body: updatedExercise });
}
