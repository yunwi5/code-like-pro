import axios from 'axios';
import { AppProperty } from '../../constants/app';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/auth`;

type RegisterProp = { email: string; name: string; password: string };
export async function registerRequest(body: RegisterProp) {
    try {
        const response = await axios.post(`${API_DOMAIN}/sign-up`, body);
        console.log(response.data);
        return { ok: true, data: response.data };
    } catch (err) {
        return { ok: false, message: (err as any).message };
    }
}

type LoginProps = { email: string; password: string };
export async function loginRequest(body: LoginProps) {
    try {
        const response = await axios.post(`${API_DOMAIN}/login`, body);
        console.log(response.data);
        return { ok: true, data: response.data };
    } catch (err) {
        return { ok: false, message: (err as any).message };
    }
}
