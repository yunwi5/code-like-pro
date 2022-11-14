export interface ITestCase {
    _id?: string;
    name?: string;
    code: string;
    expectedOutput: string;
    hidden?: boolean;
    error?: string | null;
    custom?: boolean; // True if user custom test they add while attempt
    hasOutput?: boolean;
}

// Object consists of only optional props for a property update purpose
export interface ITestCaseProps {
    name?: string;
    code?: string;
    expectedOutput?: string;
    hidden?: boolean;
    error?: string | null;
}
