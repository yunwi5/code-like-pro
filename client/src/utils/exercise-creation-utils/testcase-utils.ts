import { ITestCase, ITestResult } from '../../models/interfaces';

export function getEmptyTestCase(testCaseNumber?: number): ITestCase {
    return {
        _id: `test-case-${testCaseNumber}`,
        code: '',
        expectedOutput: '',
    };
}

export function getInitialTestCaseArray(): ITestCase[] {
    return Array(3).fill(getEmptyTestCase());
}

export function testCaseEmpty(testCase: ITestCase) {
    return testCase.code.trim() === '' || testCase.expectedOutput.trim() === '';
}

export function analyzeTestCasesResult(
    testCases: ITestCase[],
    testCasesResult: ITestResult[],
) {
    const nonEmptyTests = testCases.filter((test) => !testCaseEmpty(test));
    const haveEnoughTests = nonEmptyTests.length >= 3;
    if (!haveEnoughTests) {
        return { status: 'error', message: 'Please have at least 3 non-empty test cases!' };
    }

    const noHiddenTests = testCases.every((test) => !test.hidden);
    const noOpenTests = testCases.every((test) => test.hidden);
    if (noHiddenTests)
        return { status: 'error', message: 'Please have at least 1 hidden test(s)!' };
    if (noOpenTests)
        return { status: 'error', message: 'Please have at least 1 open test(s)!' };

    const everythingCorrect = testCasesResult.every((testCase) => testCase.correct);
    if (!everythingCorrect) return { status: 'error', message: 'You failed some tests...' };
    return { status: 'success', message: 'You passed all tests! Ready to submit.' };
}

// Test case output analysis
export function getCorrectTestCaseCount(testCaseOutputs: ITestResult[]) {
    let correct = 0;
    testCaseOutputs.forEach((result) => {
        if (result.correct) correct++;
    });
    return { correct };
}
