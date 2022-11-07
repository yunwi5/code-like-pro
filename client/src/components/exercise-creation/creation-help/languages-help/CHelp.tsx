import React from 'react';
import { runTestCases } from '../../../../apis/submission.api';
import { Language } from '../../../../models/enums';
import { ITestCase } from '../../../../models/interfaces';
import { indentEachLine } from '../../../../utils/string-utils/string-manipulation';
import CodeEditor from '../../../ui/editor/CodeEditor';
import TestCase from '../../../ui/test-cases/TestCase';
import ProgramSimulation from '../program-simulation/ProgramSimulation';

const cSolution = `
#include <stdio.h>

int getSum(int a, int b) {
    return a + b;
}`.trimStart();

const testCase: ITestCase = {
    name: 'Test Case',
    code: 'int total = getSum(5,15);\nprintf("%d", total);\n',
    expectedOutput: '20',
};

const language = Language.C;
const languageName = 'C';

const overallCode = `
${cSolution}

int main() {
\t//Your testing code
${indentEachLine(testCase.code)}
}`.trimStart();

const CHelp: React.FC = () => {
    // Run the example code
    const runCode = async () => {
        const { ok, data } = await runTestCases({
            code: cSolution,
            language,
            testCases: [testCase],
        });
        if (ok && data) return data[0];
        return null;
    };

    return (
        <article className="flex flex-col gap-7">
            <h3 className="flex-start gap-1 text-slate-600 text-2xl -mb-5">
                {languageName} Challenge Guide
            </h3>
            <div>
                <p className="mb-3">
                    In {languageName}, we do some internal job to execute your program.
                    Let's say we want to create a challenge that asks users to create a
                    function called <mark className="mark">getSum</mark>&nbsp; which
                    returns the sum of the arguments passed in.
                </p>
                <CodeEditor value={cSolution} language={language} readOnly={true} />
            </div>

            <div>
                <p className="mb-3">
                    Next, we will define an example test case that will verify our
                    solution as well as users' solution the users will submit. The test
                    correctness is based on matching the standard output of expected and
                    actual outputs. Your testing code will be placed inside the{' '}
                    <mark className="mark">main</mark> method to run the solution code you
                    wrote. This means please do not define the main method on your own!
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
                    Once we define the solution code and the test case, the following is
                    the structure of the resulting program that will be executed when you
                    run the code. In {languageName}, we include your solution code such as
                    {'  '}
                    <mark className="mark">functions</mark>,{' '}
                    <mark className="mark">structs</mark> in advance, then we insert the
                    testcase inside the <mark className="mark">main</mark> method below to
                    run the program.
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

export default CHelp;
