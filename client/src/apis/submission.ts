import { AppProperty } from '../constants/app';
import { postRequest } from './requests';
import { ITestCase, ITestResult } from '../models/interfaces';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/submission`;

// Request body: {code: string, language: string (language_code),  testCases: Array<{code, expectedOutput}>}
type RunRequestBody = { code: string; language: string; testCases: ITestCase[] };
export async function runTestCases(body: RunRequestBody) {
    return await postRequest<ITestResult[]>({ url: `${API_DOMAIN}/run`, body });
}

export async function postSubmissions() {}
