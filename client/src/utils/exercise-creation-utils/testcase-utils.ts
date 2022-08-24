import { ITestCase } from '../../models/interfaces';

export function getEmptyTestCase(testCaseNumber?: number): ITestCase {
    return {
        id: `test-case-${testCaseNumber}`,
        code: '',
        expectedOutput: '',
    };
}

export function getInitialTestCaseArray(): ITestCase[] {
    return Array(3).fill(getEmptyTestCase());
}
