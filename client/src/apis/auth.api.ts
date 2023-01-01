import { CredentialResponse } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { getRequest, postRequest } from './requests.api';
import { IUser } from '../models/interfaces/user/IUser';
import { IGoogleCredential } from '../models/interfaces';

const API_DOMAIN = '/auth';

export type AuthResponseData = { access_token: string; user: IUser };

export const createOrGetGoogleUser = async (response: CredentialResponse) => {
    const googleCredential = jwtDecode<IGoogleCredential>(response.credential || '');
    console.log('select_by', response.select_by);
    console.log(googleCredential);

    return await postRequest<AuthResponseData>({
        url: `${API_DOMAIN}/google`,
        body: googleCredential,
    });
};

type RegisterProp = { email: string; name: string; password: string };
export async function registerRequest(body: RegisterProp) {
    return await postRequest<AuthResponseData>({
        url: `${API_DOMAIN}/sign-up`,
        body,
    });
}

type LoginProps = { email: string; password: string };
export async function loginRequest(body: LoginProps) {
    return await postRequest<AuthResponseData>({ url: `${API_DOMAIN}/login`, body });
}

// Try login with the existing session.
export async function getLoginSuccess() {
    return await getRequest<{ user: IUser; cookies: any }>({
        url: `${API_DOMAIN}/login/success`,
    });
}

// Send the logout request to the server to clear the session.
export async function logoutRequest() {
    return await getRequest<{ message: string }>({ url: `${API_DOMAIN}/logout` });
}
