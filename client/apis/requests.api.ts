import axios, { AxiosRequestConfig } from 'axios';
import { AppProperty } from '../constants/app';
import { getJwtUserLocally } from '../utils/localStorage.util';

const api = axios.create({
    baseURL: `${AppProperty.SERVER_DOMAIN}/api`,
});

api.interceptors.request.use((req) => {
    const jwtData = getJwtUserLocally();
    if (req.headers && jwtData?.access_token) {
        req.headers.Authorization = `Bearer ${jwtData.access_token}`;
    }

    return req;
});

interface ReqParams {
    url: string;
    headers?: AxiosRequestConfig;
}

interface ReqBodyParams extends ReqParams {
    body: any;
}

export async function getRequest<T>({ url }: ReqParams) {
    try {
        const response = await api.get<T>(url);
        const data = response.data;
        return { ok: true, data, status: response.status };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function postRequest<T>({ url, body }: ReqBodyParams) {
    try {
        const response = await api.post<T>(url, body);
        return { ok: true, data: response.data, status: response.status };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function putRequest<T>({ url, body }: ReqBodyParams) {
    try {
        let response = await api.put<T>(url, body);
        const data = response.data;
        return { ok: true, data, status: response.status };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function patchRequest<T>({ url, body }: ReqBodyParams) {
    try {
        let response = await api.patch<T>(url, body);
        const data = response.data;
        return { ok: true, data, status: response.status };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function deleteRequest<T>({ url }: ReqParams) {
    try {
        let response = await api.delete<T>(url);
        const data = response.data;
        return { ok: true, data, status: response.status };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

// Extract error meessage from the response, if the request throws an error.
function extractErrorMessage(error: any): string {
    const responseError = error.response?.data?.message || 'Something went wrong...';
    return responseError;
}
