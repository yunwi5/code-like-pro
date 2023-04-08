import React from 'react';
import { runTestCases } from '../../../../apis/submission.api';
import { Language } from '../../../../models/enums';
import { ITestCase } from '../../../../models/interfaces';
import CodeEditor from '../../../ui/editor/CodeEditor';
import TestCase from '../../../ui/test-cases/TestCase';
import ProgramSimulation from '../program-simulation/ProgramSimulation';

const jsSolution = `
// Write all your solution related code here
function getSum(...numArgs) {
    // Use .reduce() method to derive the sum of an array.
    return numArgs.reduce((accSum, currNum) => accSum + currNum, 0);
}`.trimStart();

const testCase: ITestCase = {
  name: 'Test Case',
  code: 'const total = getSum(2,3,5,10)\nconsole.log(total)\n',
  expectedOutput: '20',
};

const language = Language.JAVASCRIPT;

const overallCode = `${jsSolution}\n\n//Your testing code\n${testCase.code}`;

const JavaScriptHelp: React.FC = () => {
  // Run the example code
  const runCode = async () => {
    const { ok, data } = await runTestCases({
      code: jsSolution,
      language,
      testCases: [testCase],
    });
    if (ok && data) return data[0];
    return null;
  };

  return (
    <article className="flex flex-col gap-7">
      <h3 className="flex-start gap-1 text-slate-600 text-xl sm:text-2xl -mb-5">
        JavaScript Challenge Guide
      </h3>
      <div>
        <p className="mb-3">
          In JavaScript (Node Js), it is easy and straightforward to create a new
          programming challenge. Let's say we want to create a challenge that asks a user
          to create a function called <mark className="mark">getSum</mark>&nbsp; which
          returns the sum of the arguments passed in.
        </p>
        <CodeEditor value={jsSolution} language={language} readOnly={true} />
      </div>

      <div>
        <p className="mb-3">
          Next, we will define an example test case that will verify our solution as well
          as users' solution the users will write when they attempt the challenge. The
          testing is based on matching the standard output of expected and actual outputs.
        </p>
        <TestCase
          language={language}
          testCase={testCase}
          readOnly={true}
          boxHeight="6rem"
        />
      </div>

      <div>
        <p className="mb-3">
          Once we define the solution code and the test case, the following is the
          structure of the resulting program that will be executed when you run the code.
          In JavaScript, we include your solution code first, then we insert the testcase
          below to run your solution code.
        </p>
        <ProgramSimulation
          code={overallCode}
          language={language}
          testCase={testCase}
          runCode={runCode}
        />
      </div>
    </article>
  );
};

export default JavaScriptHelp;
