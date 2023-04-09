import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppProperty } from '../constants';
import { getJwtUserLocally } from '../utils/localStorage.util';

type ReqParams = {
  url: string;
  headers?: AxiosRequestConfig;
  options?: ReqOptions;
};

type ReqParamsWithBody = ReqParams & { body: any };

export type ReqOptions = {
  catchErrors?: boolean;
};

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

export async function getRequest<T>({ url, options }: ReqParams) {
  return wrapRequest(() => api.get<T>(url), options);
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

async function wrapRequest<T>(
  fn: () => Promise<AxiosResponse<T, any>>,
  { catchErrors }: ReqOptions = { catchErrors: true },
) {
  try {
    const response = await fn();
    return { ok: true, data: response.data, status: response.status };
  } catch (err) {
    let message = extractErrorMessage(err);
    console.log(message);
    if (catchErrors == false) {
      throw err;
    }
    return { ok: false, message };
  }
}

function extractErrorMessage(error: any): string {
  const responseError = error.response?.data?.message || 'Something went wrong...';
  return responseError;
}
