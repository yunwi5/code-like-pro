import axios from 'axios';
import { authConfig } from './config';

// Wrapper functiosn for HTTP requests
// Reduce the amount of code for writing http requst.

type ReqBodyParams = { url: string; body: any; headers?: object };
// There can be more params in the future.
export async function postRequest<T>({ url, body, headers }: ReqBodyParams) {
    let response: any = null;
    try {
        response = await axios.post<T>(url, body, headers ?? authConfig);
        return { ok: true, data: response.data };
    } catch (err) {
        // If the status is 400~500 range, the returned data from the server may contain message
        let message = response?.data?.message || (err as any).message;
        return { ok: false, message };
    }
}

export async function getRequest<T>({ url, headers }: { url: string; headers?: object }) {
    let response: any = null;
    try {
        response = await axios.get<T>(url, headers ?? authConfig);
        return { ok: true, data: response.data };
    } catch (err) {
        let message = response?.data?.message || (err as any).message;
        return { ok: false, message };
    }
}

export async function putRequest<T>({ url, body, headers }: ReqBodyParams) {
    let response: any = null;
    try {
        response = await axios.put<T>(url, body, headers ?? authConfig);
        return { ok: true, data: response.data };
    } catch (err) {
        let message = response?.data?.message || (err as any).message;
        return { ok: false, message };
    }
}
