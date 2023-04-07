import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppProperty } from '../constants/app';
import { getJwtUserLocally } from '../utils/localStorage.util';

type ReqParams = {
  url: string;
  headers?: AxiosRequestConfig;
};

type ReqParamsWithBody = ReqParams & { body: any };

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

export async function getRequest<T>({ url }: ReqParams) {
  return wrapRequest(() => api.get<T>(url));
}

export async function postRequest<T>({ url, body }: ReqParamsWithBody) {
  return wrapRequest(() => api.post<T>(url, body));
}

export async function putRequest<T>({ url, body }: ReqParamsWithBody) {
  return wrapRequest(() => api.put<T>(url, body));
}

export async function patchRequest<T>({ url, body }: ReqParamsWithBody) {
  return wrapRequest(() => api.patch<T>(url, body));
}

export async function deleteRequest<T>({ url }: ReqParams) {
  return wrapRequest(() => api.delete<T>(url));
}

async function wrapRequest<T>(fn: () => Promise<AxiosResponse<T, any>>) {
  try {
    const response = await fn();
    return { ok: true, data: response.data, status: response.status };
  } catch (err) {
    let message = extractErrorMessage(err);
    console.log(message);
    return { ok: false, message };
  }
}

function extractErrorMessage(error: any): string {
  const responseError = error.response?.data?.message || 'Something went wrong...';
  return responseError;
}
