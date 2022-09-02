import axios from 'axios';
import { AppProperty } from '../constants/app';
import { IUser } from '../models/interfaces/IUser';
import { authConfig } from './config';
import { getRequest, postRequest } from './requests';

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

export async function getLoginSuccess() {
    return await getRequest({ url: `${API_DOMAIN}/login/success` });
}

export async function privateRequest() {
    return await getRequest<{ message: string }>({
        url: `${AppProperty.SERVER_DOMAIN}/api/protected`,
    });
}
