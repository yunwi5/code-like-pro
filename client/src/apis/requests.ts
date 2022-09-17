import axios, { AxiosRequestConfig } from 'axios';
import { authConfig } from './config';

// Helper functions for HTTP requests that abstract the request processes.
// Reduce the amount of code for writing http requst.

// Request params for GET & DELETE requests
type ReqParams = { url: string; headers?: AxiosRequestConfig };
// Request params for POST &  PUT & PATCH requests
type ReqBodyParams = { url: string; body: any; headers?: AxiosRequestConfig };

export async function getRequest<T>({ url, headers }: ReqParams) {
    let data: T | null = null;
    try {
        const response = await axios.get<T>(url, headers ?? authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        // 400 ~ 500
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

// There can be more params in the future.
export async function postRequest<T>({ url, body, headers }: ReqBodyParams) {
    let data: T | null = null;
    try {
        const response = await axios.post<T>(url, body, headers ?? authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        // If the status is 400~500 range, the returned data from the server may contain message
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function putRequest<T>({ url, body, headers }: ReqBodyParams) {
    let data: T | null = null;
    try {
        let response = await axios.put<T>(url, body, headers ?? authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function patchRequest<T>({ url, body, headers }: ReqBodyParams) {
    let data: T | null = null;
    try {
        let response = await axios.patch<T>(url, body, headers ?? authConfig);
        data = response.data;
        return { ok: true, data };
    } catch (err) {
        let message = extractErrorMessage(err);
        console.log(message);
        return { ok: false, message };
    }
}

export async function deleteRequest<T>({ url, headers }: ReqParams) {
    let data: T | null = null;
    try {
        let response = await axios.delete<T>(url, headers ?? authConfig);
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
    let responseError = error.response.data.message;
    if (typeof responseError !== 'string') {
        responseError = responseError?.message || 'Something went wrong...';
    }
    return responseError;
}
