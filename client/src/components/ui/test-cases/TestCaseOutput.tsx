import React, { useState } from "react";
import ExpandShrinkToggler from "../buttons/icon-buttons/ExpandShrinkToggler";
import { ITestCase, ITestCaseProps } from "../../../models/interfaces";

interface Props {
  expectedOutput: string;
  actualOutput: string;
  status?: boolean;
  name: string;
}

const TestCaseOutput: React.FC<Props> = ({
  expectedOutput,
  actualOutput,
  status,
  name,
}) => {
  const [isShrinked, setIsShrinked] = useState(false);

  return (
    <div
      className={`flex flex-col gap-2 px-3 py-2 bg-gray-200 rounded-sm shadow-md focus-within:shadow-md`}
    >
      <h3 className="text-lg flex items-center justify-between">
        Test Case
        <ExpandShrinkToggler
          isShrinked={isShrinked}
          setIsShrinked={setIsShrinked}
        />
      </h3>
      {!isShrinked && (
        <>
          <div className="flex flex-col lg:flex-row flex-wrap gap-3 justify-between">
            <div className="min-w-[10rem] flex-1">
              <p className="px-2 py-1 bg-gray-300">Expected Output</p>
              <div
                className={`text-sm min-h-[82.7%] min-w-[100%] flex-1 px-3 py-2 bg-white border-2 border-slate-300 shadow-md rounded-sm focus:outline focus:outline-2 focus:outline-main-300/90 focus:!outline-none"
                }`}
              >
                <p>{expectedOutput}</p>
              </div>
            </div>
            <div className="min-w-[10rem] flex-1">
              <p className="px-2 py-1 bg-gray-300">Your Output</p>
              <div
                className={`text-sm min-h-[82.7%] min-w-[100%] flex-1 px-3 py-2 bg-white border-2 border-slate-300 shadow-md rounded-sm focus:outline focus:outline-2 focus:outline-main-300/90 focus:!outline-none"
                }`}
              >
                <p>{actualOutput}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TestCaseOutput;
