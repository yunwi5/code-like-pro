import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppProperty } from '../constants';
import { getJwtUserLocally } from '@/utils/localStorage.util';

type ReqParams = {
  url: string;
  headers?: AxiosRequestConfig;
  options?: ReqOptions;
};

type ReqParamsWithBody = ReqParams & { body: any };

export type ReqOptions = {
  catchErrors?: boolean;
  authDisabled?: boolean;
};

const api = axios.create({
  baseURL: `${AppProperty.SERVER_DOMAIN}/api`,
});

export async function getRequest<T>({ url, options }: ReqParams) {
  return wrapRequest((api: AxiosInstance) => api.get<T>(url), options);
}

export async function postRequest<T>({ url, body }: ReqParamsWithBody) {
  return wrapRequest((api: AxiosInstance) => api.post<T>(url, body));
}

export async function putRequest<T>({ url, body }: ReqParamsWithBody) {
  return wrapRequest((api: AxiosInstance) => api.put<T>(url, body));
}

export async function patchRequest<T>({ url, body }: ReqParamsWithBody) {
  return wrapRequest((api: AxiosInstance) => api.patch<T>(url, body));
}

export async function deleteRequest<T>({ url }: ReqParams) {
  return wrapRequest((api: AxiosInstance) => api.delete<T>(url));
}

async function wrapRequest<T>(
  fn: (api: AxiosInstance) => Promise<AxiosResponse<T, any>>,
  { catchErrors, authDisabled }: ReqOptions = { catchErrors: true, authDisabled: false },
) {
  try {
    if (authDisabled == false) {
      const jwtData = getJwtUserLocally();
      if (jwtData?.access_token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${jwtData.access_token}`;
      }
    }

    const response = await fn(api);
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
