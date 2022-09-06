import { AppProperty } from '../constants/app';
import { IUserDetail } from '../models/interfaces/user/IUserDetail';
import { getRequest, patchRequest } from './requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/user`;

export async function getUserDetail(userId: string) {
    return await getRequest<IUserDetail>({ url: `${API_DOMAIN}/${userId}` });
}

type PatchBody = { name: string; pictureUrl: string; description: string };
export async function patchUserDetail(body: PatchBody) {
    return await patchRequest({ url: API_DOMAIN, body });
}
