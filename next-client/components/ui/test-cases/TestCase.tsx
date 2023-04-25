import React, { FC, useCallback, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { ImBin2 } from 'react-icons/im';

import { Language } from '../../../models/enums';
import { ITestCase, ITestCaseProps, ITestOutput } from '../../../models/interfaces';
import ExpandShrinkToggler from '../buttons/icon-buttons/ExpandShrinkToggler';
import CodeEditor from '../editor/code-editor/CodeEditor';

interface Props {
  className?: string;
  language: Language;
  testCase: ITestCase;
  onUpdate?: (props: ITestCaseProps) => void;
  onDelete?: () => void;
  output?: ITestOutput | undefined;
  readOnly?: boolean;
  boxHeight?: string;
  hiddenDisabled?: boolean;
  headingLabel?: JSX.Element;
  headingMessage?: JSX.Element | string;
}

const TestCase: FC<Props> = (props) => {
  const {
    className = '',
    language,
    testCase,
    onUpdate,
    onDelete,
    output,
    readOnly = false,
    boxHeight = '10rem',
    hiddenDisabled = false,
    headingLabel,
    headingMessage,
  } = props;
  const [isShrinked, setIsShrinked] = useState(false);

  const handleCodeChange = useCallback(
    (code: string) => onUpdate && onUpdate({ code }),
    [onUpdate],
  );

  const handleOutputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      onUpdate && onUpdate({ expectedOutput: e.target.value }),
    [onUpdate],
  );

  const handleHidden = useCallback(
    () => onUpdate && onUpdate({ hidden: !testCase.hidden }),
    [testCase, onUpdate],
  );

  const statusClass = getStatusClass(output);
  const paddingClass = readOnly ? 'pb-3' : 'pb-[0.35rem]';

  const expectedOutput = (
    <ExpectedOutput
      onOutputChange={handleOutputChange}
      expectedOutput={testCase.expectedOutput}
      className={output ? 'min-h-[6rem]' : boxHeight}
      readOnly={readOnly}
    />
  );

  return (
    <div
      id={testCase?._id}
      className={`flex flex-col gap-2 px-3 pt-2 bg-gray-200 rounded-sm shadow-md focus-within:shadow-md ${paddingClass} ${statusClass} ${className}`}
    >
      <TestCaseHeading
        name={testCase?.name || ''}
        output={output}
        isShrinked={isShrinked}
        setIsShrinked={setIsShrinked}
        customLabel={headingLabel}
        message={headingMessage}
      />
      {!isShrinked && (
        <>
          <div className="flex flex-col lg:flex-row flex-wrap gap-3 justify-between">
            {/* Testcase code editor */}
            <div className="flex-1 overflow-hidden shadow-md">
              <p className="px-2 py-1 bg-gray-300">Code</p>
              <CodeEditor
                language={language}
                onChange={handleCodeChange}
                showHeader={false}
                value={testCase.code}
                height={boxHeight}
                validation={false}
                readOnly={readOnly}
              />
            </div>
            {!output && expectedOutput}
          </div>

          {/* Actual output of the test running */}
          {output && (
            <div className="flex flex-col lg:flex-row flex-wrap gap-3 justify-between mb-2">
              {expectedOutput}
              <ActualOutput output={output} />
            </div>
          )}

          {/* Bottom control bar for hidden test and remove */}
          {!readOnly && (
            <TestCaseControl
              onHidden={handleHidden}
              hidden={testCase.hidden || false}
              disabled={hiddenDisabled}
              onDelete={onDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

// Header of the test case component. Name, status and shrink toggler.
interface HeadingProps {
  name: string;
  output: ITestOutput | undefined;
  isShrinked: boolean;
  setIsShrinked: React.Dispatch<React.SetStateAction<boolean>>;
  customLabel?: JSX.Element;
  message?: JSX.Element | string;
}
const TestCaseHeading: FC<HeadingProps> = (props) => {
  const { name, output, isShrinked, setIsShrinked, customLabel, message } = props;

  // Display default status label only if there is an output and the custom label is undefined
  const displayStatusLabel = !!output && !customLabel;

  return (
    <div>
      <h3 className="text-lg flex items-center justify-between">
        {name}
        <span className="text-2xl ml-3">
          {displayStatusLabel &&
            (output.correct ? (
              <AiOutlineCheck className="text-green-700" />
            ) : (
              <AiOutlineClose className="text-rose-700" />
            ))}
        </span>
        {customLabel}
        <ExpandShrinkToggler
          className="ml-auto"
          isShrinked={isShrinked}
          setIsShrinked={setIsShrinked}
        />
      </h3>
      {message}
    </div>
  );
};

// Expected output block
interface ExpectedOutputProps {
  readOnly: boolean;
  expectedOutput: string;
  onOutputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}
export const ExpectedOutput: FC<ExpectedOutputProps> = ({
  onOutputChange,
  expectedOutput,
  className = '',
  readOnly,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <p className="px-2 py-1 bg-gray-300">Expected Output</p>
      <textarea
        onChange={onOutputChange}
        value={expectedOutput}
        rows={3}
        className={`grow shrink text-sm min-w-[100%] !px-3 py-2 input ${
          readOnly && 'focus:!outline-none'
        } ${className}`}
      />
    </div>
  );
};

// Actual output block
interface OutputProps {
  output: ITestOutput;
}
// Actual output should always be readonly mode.
const ActualOutput: FC<OutputProps> = ({ output }) => {
  // If there is a std error, show error traceback instead of an output for more meaningful feedback.
  const error = output.error;
  const errorClass = error ? 'bg-rose-50 text-rose-700' : '';

  return (
    <div className="flex-1 flex flex-col">
      <p className="px-2 py-1 bg-gray-300">Actual Output</p>
      {/* Readonly output */}
      <div
        className={`input flex-1 w-full px-3 py-2 whitespace-pre text-sm focus:!outline-none ${errorClass}`}
      >
        {error ?? output.actualOutput}
      </div>
    </div>
  );
};

interface ControlProps {
  onHidden(): void;
  hidden: boolean;
  disabled: boolean;
  onDelete?: () => void;
}
// Controlling hidden test and remove test functionalities
const TestCaseControl: FC<ControlProps> = ({ onHidden, hidden, disabled, onDelete }) => {
  return (
    <div className="-mt-1 flex-between">
      <p className="flex">
        <input type="checkbox" disabled={disabled} onChange={onHidden} checked={hidden ?? false} />
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
  );
};

function getStatusClass(output: ITestOutput | undefined) {
  if (!output) return '';
  return output.correct ? 'bg-green-200/70' : 'bg-rose-200/70';
}

export default TestCase;
