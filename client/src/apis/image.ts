import { AppProperty } from '../constants/app';
import { deleteRequest, postRequest } from './requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/image`;

export function postExercisePromptImage(body: { image: string; exerciseId?: string }) {
    return postRequest<any>({ url: `${API_DOMAIN}/exercise`, body });
}

export function postUserImage(body: { image: string }) {
    return postRequest<any>({ url: `${API_DOMAIN}/user`, body });
}
