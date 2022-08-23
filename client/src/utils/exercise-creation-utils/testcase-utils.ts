import { ITestCase } from '../../models/interfaces';

export function getEmptyTestCase(): ITestCase {
    return { code: '', expectedOutput: '' };
}

export function getInitialTestCaseArray(): ITestCase[] {
    return Array(3).fill(getEmptyTestCase());
}
