import { AppProperty } from '../constants/app';
import { IUserDetail, IUserInfo } from '../models/interfaces';
import { getRequest, patchRequest } from './requests.api';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/user`;

// GET detailed information including creations, submissions, and favorites.
export async function getUserDetail(userId: string) {
    return await getRequest<IUserDetail>({ url: `${API_DOMAIN}/${userId}/detail` });
}

// GET basic user information
export function getUserInfo(userId: string) {
    return getRequest<IUserInfo>({ url: `${API_DOMAIN}/${userId}` });
}

type PatchBody = { name: string; pictureUrl: string; description: string };
export async function patchUserDetail(body: PatchBody) {
    return await patchRequest({ url: API_DOMAIN, body });
}
