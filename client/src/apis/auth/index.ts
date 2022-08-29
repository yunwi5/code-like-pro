import axios from 'axios';
import { AppProperty } from '../../constants/app';
import { authConfig } from '../config';
import { postRequest } from '../requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/auth`;

type RegisterProp = { email: string; name: string; password: string };
export async function registerRequest(body: RegisterProp) {
    return await postRequest({ url: `${API_DOMAIN}/sign-up`, body, headers: authConfig });
}

type LoginProps = { email: string; password: string };
export async function loginRequest(body: LoginProps) {
    return await postRequest({ url: `${API_DOMAIN}/login`, body, headers: authConfig });
}

export async function getProtected() {
    let response: any;
    try {
        response = await axios.get(`${AppProperty.SERVER_DOMAIN}/api/protected`, authConfig);
        return { ok: true, data: response.data };
    } catch (err) {
        return { ok: false, message: response?.data?.message || (err as any).message };
    }
}
