import React, { useState } from "react";
import { Language } from "../../../models/enums";
import CodeEditor from "../editor/code-editor/CodeEditor";
import ExpandShrinkToggler from "../buttons/icon-buttons/ExpandShrinkToggler";
import { ImBin2 } from "react-icons/im";
import { ITestCase, ITestCaseProps } from "../../../models/interfaces";

interface Props {
  language: Language;
  testCase: ITestCase;
  onUpdate?: (props: ITestCaseProps) => void;
  onDelete?: () => void;
  readOnly?: boolean;
}

const TestCaseOutput: React.FC<Props> = ({
  language,
  testCase,
  onUpdate,
  onDelete,
  readOnly = false,
}) => {
  const [isShrinked, setIsShrinked] = useState(false);

  const handleCodeChange = (code: string) => {
    onUpdate && onUpdate({ code });
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const expectedOutput: string = e.target.value;
    onUpdate && onUpdate({ expectedOutput });
  };

  const handleHidden = () => onUpdate && onUpdate({ hidden: !testCase.hidden });

  return (
    <div
      id={testCase?.id}
      className={`flex flex-col gap-2 px-3 py-2 bg-gray-200 rounded-sm shadow-md focus-within:shadow-md`}
    >
      <h3 className="text-lg flex items-center justify-between">
        {testCase.name}
        <ExpandShrinkToggler
          isShrinked={isShrinked}
          setIsShrinked={setIsShrinked}
        />
      </h3>
      {!isShrinked && (
        <>
          <div className="flex flex-col lg:flex-row flex-wrap gap-3 justify-between">
            <div className="flex-1 overflow-hidden">
              <p className="px-2 py-1 bg-gray-300">Code</p>
              <CodeEditor
                language={language}
                onChange={handleCodeChange}
                showHeader={false}
                value={testCase.code}
                height={"10rem"}
                validation={false}
                readOnly={readOnly}
              />
            </div>
            <div className="min-w-[10rem] flex-1">
              <p className="px-2 py-1 bg-gray-300">Expected Output</p>
              <textarea
                rows={5}
                onChange={handleOutputChange}
                value={testCase.expectedOutput}
                className={`text-sm min-h-[82.7%] min-w-[100%] flex-1 px-3 py-2 bg-white border-2 border-slate-300 shadow-md rounded-sm focus:outline focus:outline-2 focus:outline-main-300/90 ${
                  readOnly && "focus:!outline-none"
                }`}
              />
            </div>
          </div>
          {!readOnly && (
            <div className="flex-between">
              <p className="flex">
                <input
                  type="checkbox"
                  onChange={handleHidden}
                  checked={testCase.hidden ?? false}
                />
                &ensp;Hidden&nbsp;
                <span className="hidden md:inline">Test</span>
              </p>
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="flex-center gap-2 px-3 py-1 transition-all rounded-full hover:bg-rose-500/90 hover:text-white"
                >
                  <ImBin2 />
                  Remove
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default TestCaseOutput;
