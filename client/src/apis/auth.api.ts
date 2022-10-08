import { AppProperty } from '../constants/app';
import { IUser } from '../models/interfaces/user/IUser';
import { getRequest, postRequest } from './requests.api';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/auth`;

type RegisterProp = { email: string; name: string; password: string };
export async function registerRequest(body: RegisterProp) {
    return await postRequest<IUser>({
        url: `${API_DOMAIN}/sign-up`,
        body,
    });
}

type LoginProps = { email: string; password: string };
export async function loginRequest(body: LoginProps) {
    return await postRequest<IUser>({ url: `${API_DOMAIN}/login`, body });
}

// Try login with the existing session.
export async function getLoginSuccess() {
    return await getRequest<IUser>({ url: `${API_DOMAIN}/login/success` });
}

// Send the logout request to the server to clear the session.
export async function logoutRequest() {
    return await getRequest<{ message: string }>({ url: `${API_DOMAIN}/logout` });
}
