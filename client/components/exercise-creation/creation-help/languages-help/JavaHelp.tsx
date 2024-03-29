import React from 'react';

import { runTestCases } from '../../../../apis/submission.api';
import { Language } from '../../../../models/enums';
import { ITestCase } from '../../../../models/interfaces';
import { prettierLanguageName } from '../../../../utils/language.util';
import { indentEachLine } from '../../../../utils/string-utils/string-manipulation.util';
import CodeEditor from '../../../ui/editor/code-editor/CodeEditor';
import TestCase from '../../../ui/test-cases/TestCase';
import ProgramSimulation from '../program-simulation/ProgramSimulation';

const javaSolution = `
import java.util.Arrays; 

// Your solution class
class Main {
    public static int getSum(int ...numArgs) {
        return Arrays.stream(numArgs).sum();
    }
}`.trimStart();

const testCase: ITestCase = {
  name: 'Test Case',
  code: 'int total = Main.getSum(1,3,6,10);\nSystem.out.println(total);\n',
  expectedOutput: '20',
};

const language = Language.JAVA;
const languageName = prettierLanguageName(language);

const overallCode = `
${javaSolution}

// class that defines a main method to run your solution code
class Test {
    // main method that contains your testing code
    public static void main(String[] args) {
        ${indentEachLine(testCase.code, '\t\t').trim()}
    }
}\n`.trimStart();

const CppHelp: React.FC = () => {
  // Run the example code
  const runCode = async () => {
    const { ok, data } = await runTestCases({
      code: javaSolution,
      language,
      testCases: [testCase],
    });
    if (ok && data) return data[0];
    return null;
  };

  return (
    <article className="flex flex-col gap-8">
      <h3 className="flex-start gap-1 text-slate-600 text-xl sm:text-2xl -mb-5">
        {languageName} Challenge Guide
      </h3>
      <div>
        <p className="mb-3">
          In {languageName}, we do some internal job to execute your program. Let&apos;s say we want
          to create a challenge that asks users to create a function called{' '}
          <mark className="mark">getSum</mark>&nbsp; which returns the sum of the arguments passed
          in. You can use the default <mark className="mark">Main</mark> class to define your
          function. Or, you can define your own classes if needed. You can test all of them in the
          test cases.
        </p>
        <CodeEditor value={javaSolution} language={language} readOnly={true} height="11rem" />
      </div>

      <div>
        <p className="mb-3">
          Next, we will define an example test case that will verify our solution as well as
          users&apos; solution the users will submit. The test correctness is based on matching the
          standard output of expected and actual outputs. Your testing code will be placed inside
          the <mark className="mark">main</mark> method of the <mark className="mark">Test</mark>{' '}
          class to run the solution code. This means please do not define the main method as well as
          Test class on your own!
        </p>
        <TestCase language={language} testCase={testCase} readOnly={true} boxHeight="6rem" />
      </div>

      <div>
        <p className="mb-3">
          Once we define the solution code and the test case, the following is the structure of the
          resulting program that will be executed when you run the code. In {languageName}, we
          include your solution code such as your <mark className="mark">classes</mark> in advance,
          then we insert the testcase inside the <mark className="mark">main</mark> method of the{' '}
          <mark className="mark">Test</mark> class below to run the whole program.
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

export default CppHelp;
