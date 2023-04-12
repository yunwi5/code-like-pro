import React, { useRef, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { MdOutlineArrowDropDown, MdOutlineArrowRight } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

import { Language } from '../../../../models/enums';
import { ITestCase, ITestOutput } from '../../../../models/interfaces';
import { prettierLanguageName } from '../../../../utils/language.util';
import Button from '../../../ui/buttons/Button';
import CodeEditor from '../../../ui/editor/CodeEditor';

interface Props {
  code: string;
  testCase: ITestCase;
  language: Language;
  runCode: () => Promise<ITestOutput | null>;
}

function getOutputIcon(correct: boolean | undefined) {
  if (correct == null) return null;
  return correct ? (
    <AiOutlineCheck className="text-green-700" />
  ) : (
    <AiOutlineClose className="text-rose-700" />
  );
}

const ProgramSimulation: React.FC<Props> = (props) => {
  const { code, language, testCase, runCode } = props;
  // testcase container ref
  const testCaseRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  // Test output
  const [output, setOutput] = useState<ITestOutput | null>(null);

  const handleCodeRun = async () => {
    setIsLoading(true);
    const result = await runCode();
    setIsLoading(false);
    setOutput(result);

    if (result) {
      // If there is new output, show the output
      setShowOutput(true);

      // Scroll down a bit to show the output into view automatically
      setTimeout(() => {
        testCaseRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleShowOutput = () => {
    setShowOutput((ps) => {
      const nextShow = !ps;
      if (!nextShow) setOutput(null);
      return !ps;
    });
  };

  // success or error icons
  const outputIcon = <span className="text-[1.2em]">{getOutputIcon(output?.correct)}</span>;

  return (
    <div className="flex flex-col gap-2 mb-4 bg-gray-50 rounded overflow-hidden shadow">
      <div>
        <h4 className="flex-between px-2 py-2 text-xl bg-gray-200">
          {prettierLanguageName(language)}
          {isLoading ? (
            <ClipLoader color="#5552e4" size={30} />
          ) : (
            <Button onClick={handleCodeRun} size="small" className="min-w-[4rem] !py-1 !rounded-md">
              Run
            </Button>
          )}
        </h4>
        <CodeEditor
          readOnly={true}
          className="!shadow-none !border-none"
          value={code}
          height="12rem"
          language={language}
          showHeader={false}
        />
      </div>

      {/* Code output section */}
      <div className={`flex-between pt-1 ${showOutput ? '' : 'pb-2'}`}>
        <button
          onClick={handleShowOutput}
          className="flex-start group ml-2 px-2 py-1 hover:bg-slate-600 hover:text-white rounded-2xl"
        >
          Output
          {showOutput ? <MdOutlineArrowRight /> : <MdOutlineArrowDropDown />}
        </button>

        {output?.correct && <p className="text-green-600 pr-2">Success</p>}
      </div>

      {showOutput && (
        <div
          ref={testCaseRef}
          id="testcase-view"
          className="grid gap-2 md:grid-cols-1 lg:grid-cols-2 min-h-[7.5rem]"
        >
          <div className="flex flex-col rounded">
            <h5 className="flex-between bg-gray-200 px-2 py-1 font-semibold">
              Expected Output
              {outputIcon}
            </h5>
            <textarea
              className="flex-1 input border-2 border-transparent focus:border-main-300 !outline-none"
              readOnly
              value={testCase.expectedOutput}
            />
          </div>

          <div className="flex flex-col rounded">
            <h5 className="flex-between bg-gray-200 px-2 py-1 font-semibold">
              Actual Output
              {outputIcon}
            </h5>
            <textarea
              className="flex-1 input border-2 border-transparent focus:border-main-300 !outline-none"
              readOnly
              value={output?.actualOutput || ''}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramSimulation;
