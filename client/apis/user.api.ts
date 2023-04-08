import { IUser, IUserDetail, IUserInfo } from '../models/interfaces';
import { getRequest, patchRequest } from './common-requests';

const API_DOMAIN = '/user';

// GET detailed information including creations, submissions, and favorites.
export async function getUserDetail(userId: string) {
    return await getRequest<IUserDetail>({ url: `${API_DOMAIN}/${userId}/detail` });
}

// GET basic user information
export function getUserInfo(userId: string) {
    return getRequest<IUserInfo>({ url: `${API_DOMAIN}/${userId}` });
}

export type UserDetailProps = { name: string; pictureUrl: string; description: string };
export async function patchUserDetail(body: UserDetailProps) {
    return await patchRequest<IUser>({ url: API_DOMAIN, body });
}
