import axios from 'axios';

// Wrapper functiosn for HTTP requests
// Reduce the amount of code for writing http requst.

// There can be more params in the future.
export async function postRequest<T>({ url, body }: { url: string; body: T }) {
    let response: any = null;
    try {
        response = await axios.post<T>(url, body);
        return { ok: true, data: response.data };
    } catch (err) {
        // If the status is 400~500 range, the returned data from the server may contain message
        let message = response?.data?.message || (err as any).message;
        return { ok: false, message };
    }
}
