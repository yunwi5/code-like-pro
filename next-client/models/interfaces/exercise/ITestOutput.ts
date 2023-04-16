// Array<{ correct: boolean; actualOutput: string; expectedOutput: string }>;
export interface ITestOutput {
  correct: boolean;
  actualOutput: string;
  expectedOutput: string;
  // Std error from the code execution.
  //This should be displayed if there is any compile/runtime error from the user's code
  error: string | null;
}
