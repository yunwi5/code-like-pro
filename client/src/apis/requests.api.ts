import axios, { AxiosRequestConfig } from 'axios';
import { AppProperty } from '../constants/app';
import { authConfig } from './config';

const api = axios.create({
    baseURL: `${AppProperty.SERVER_DOMAIN}/api`,
});

// Request params for GET & DELETE requests
type ReqParams = { url: string; headers?: AxiosRequestConfig };
// Request params for POST &  PUT & PATCH requests
type ReqBodyParams = { url: string; body: any; headers?: AxiosRequestConfig };

export async function getRequest<T>({ url }: ReqParams) {
    let data: T | null = null;
    try {
        const response = await api.get<T>(url, authConfig);
        data = response.data;
        return { ok: true, data, response };
    } catch (err) {
        // 400 ~ 500
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

// There can be more params in the future.
export async function postRequest<T>({ url, body }: ReqBodyParams) {
    let data: T | null = null;
    try {
        const response = await api.post<T>(url, body, authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function putRequest<T>({ url, body }: ReqBodyParams) {
    let data: T | null = null;
    try {
        let response = await api.put<T>(url, body, authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function patchRequest<T>({ url, body }: ReqBodyParams) {
    let data: T | null = null;
    try {
        let response = await api.patch<T>(url, body, authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function deleteRequest<T>({ url }: ReqParams) {
    let data: T | null = null;
    try {
        let response = await api.delete<T>(url, authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

// Extract error meessage from the response, if the request throws an error.
function extractErrorMessage(error: any): string {
    console.log('Response error:', error);
    const responseError =
        error.response?.data?.message || error.message || 'Something went wrong...';
    return responseError;
}
