import { AppProperty } from '../../constants/app';
import { postRequest } from '../requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/auth`;

type RegisterProp = { email: string; name: string; password: string };
export async function registerRequest(body: RegisterProp) {
    return await postRequest({ url: `${API_DOMAIN}/sign-up`, body });
}

type LoginProps = { email: string; password: string };
export async function loginRequest(body: LoginProps) {
    return await postRequest({ url: `${API_DOMAIN}/login`, body });
}
