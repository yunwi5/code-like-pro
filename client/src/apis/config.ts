import { AxiosRequestConfig } from 'axios';

export const authConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
    },
};
