import { ITestCase, ITestOutput } from '../../models/interfaces';

// Creater's test case
export function getEmptyTestCase(testCaseNumber?: number): ITestCase {
    return {
        _id: `test-case-${testCaseNumber}`,
        code: '',
        expectedOutput: '',
    };
}

// User defined custom test case
export function getEmptyCustomTestCase(testCaseNumber?: number): ITestCase {
    const newCustomTest: ITestCase = {
        _id: `custom-test-case-${testCaseNumber}`,
        name: `Custom Test ${(testCaseNumber ?? 0) + 1}`,
        code: '',
        expectedOutput: '',
        custom: true,
        hasOutput: false,
    };
    return newCustomTest;
}

export function getInitialTestCaseArray(): ITestCase[] {
    return Array(3).fill(getEmptyTestCase());
}

export function testCaseEmpty(testCase: ITestCase) {
    return testCase.code.trim() === '' || testCase.expectedOutput.trim() === '';
}

// Inspect the test cases before sending them to the server to make sure they are non-empty
export function testCasesEmpty(testCases: ITestCase[]) {
    return testCases.every((testCase) => testCaseEmpty(testCase));
}

// Analyse and validate test cases result
export function analyzeTestCasesResult(
    testCases: ITestCase[],
    testCasesResult: ITestOutput[],
) {
    const nonEmptyTests = testCases.filter((test) => !testCaseEmpty(test));
    const haveEnoughTests = nonEmptyTests.length >= 3;
    if (!haveEnoughTests) {
        return {
            status: 'error',
            message: 'Please have at least 3 non-empty test cases!',
        };
    }

    const noHiddenTests = testCases.every((test) => !test.hidden);
    const noOpenTests = testCases.every((test) => test.hidden);
    if (noHiddenTests)
        return { status: 'error', message: 'Please have at least 1 hidden test(s)!' };
    if (noOpenTests)
        return { status: 'error', message: 'Please have at least 1 open test(s)!' };

    const everythingCorrect = testCasesResult.every((testCase) => testCase.correct);
    if (!everythingCorrect)
        return { status: 'error', message: 'You failed some tests...' };
    return { status: 'success', message: 'You passed all tests! Ready to submit.' };
}

// Test case output analysis
export function getCorrectTestCaseCount(testCaseOutputs: ITestOutput[]) {
    let correct = 0;
    testCaseOutputs.forEach((result) => {
        if (result.correct) correct++;
    });
    return { correct };
}
