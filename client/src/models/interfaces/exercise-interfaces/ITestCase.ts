export interface ITestCase {
    name?: string;
    code: string;
    expectedOutput: string;
    hidden?: boolean;
    error?: string | null;
}

// Object consists of only optional props for a property update purpose
export interface ITestCaseProps {
    name?: string;
    code?: string;
    expectedOutput?: string;
    hidden?: boolean;
    error?: string | null;
}
