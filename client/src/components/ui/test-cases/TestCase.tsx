import React, { useState } from 'react';
import { Language } from '../../../models/enums';
import CodeEditor from '../editor/CodeEditor';
import ExpandShrinkToggler from '../buttons/icon-buttons/ExpandShrinkToggler';
import { ImBin2 } from 'react-icons/im';
import { ITestCase, ITestCaseProps, ITestResult } from '../../../models/interfaces';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

interface Props {
    language: Language;
    testCase: ITestCase;
    onUpdate?: (props: ITestCaseProps) => void;
    onDelete?: () => void;
    output?: ITestResult | undefined;
    readOnly?: boolean;
}

const TestCase: React.FC<Props> = (props) => {
    const { language, testCase, onUpdate, onDelete, output, readOnly = false } = props;
    const [isShrinked, setIsShrinked] = useState(false);

    const handleCodeChange = (code: string) => {
        onUpdate && onUpdate({ code });
    };

    const handleOutputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const expectedOutput: string = e.target.value;
        onUpdate && onUpdate({ expectedOutput });
    };

    const handleHidden = () => onUpdate && onUpdate({ hidden: !testCase.hidden });

    const statusClass = getStatusClass(output);

    const expectedOutputComponent = (
        <ExpectedOutput
            onOutputChange={handleOutputChange}
            expectedOutput={testCase.expectedOutput}
            readOnly={readOnly}
        />
    );

    return (
        <div
            id={testCase?._id}
            className={`flex flex-col gap-2 px-3 py-2 bg-gray-200 rounded-sm shadow-md focus-within:shadow-md ${statusClass}`}
        >
            <TestCaseHeading
                name={testCase?.name || ''}
                output={output}
                isShrinked={isShrinked}
                setIsShrinked={setIsShrinked}
            />
            {!isShrinked && (
                <>
                    <div className="flex flex-col lg:flex-row flex-wrap gap-3 justify-between">
                        {/* Testcase code editor */}
                        <div className="flex-1 overflow-hidden">
                            <p className="px-2 py-1 bg-gray-300">Code</p>
                            <CodeEditor
                                language={language}
                                onChange={handleCodeChange}
                                showHeader={false}
                                value={testCase.code}
                                height={'10rem'}
                                validation={false}
                                readOnly={readOnly}
                            />
                        </div>
                        {!output && expectedOutputComponent}
                    </div>

                    {/* Actual output of the test running */}
                    {output && (
                        <div className="flex flex-col lg:flex-row flex-wrap gap-3 justify-between mb-2">
                            {expectedOutputComponent}
                            <ActualOutput
                                readOnly={readOnly}
                                actualOutput={output.actualOutput}
                            />
                        </div>
                    )}

                    {/* Bottom control bar for hidden test and remove */}
                    {!readOnly && (
                        <TestCaseControl
                            onHidden={handleHidden}
                            hidden={testCase.hidden || false}
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
    output: ITestResult | undefined;
    isShrinked: boolean;
    setIsShrinked: React.Dispatch<React.SetStateAction<boolean>>;
}
const TestCaseHeading: React.FC<HeadingProps> = (props) => {
    const { name, output, isShrinked, setIsShrinked } = props;

    return (
        <h3 className="text-lg flex items-center justify-between">
            {name}
            <span className="text-2xl ml-3 mr-auto">
                {!!output &&
                    (output.correct ? (
                        <AiOutlineCheck className="text-green-700" />
                    ) : (
                        <AiOutlineClose className="text-rose-700" />
                    ))}
            </span>
            <ExpandShrinkToggler isShrinked={isShrinked} setIsShrinked={setIsShrinked} />
        </h3>
    );
};

// Actual output block
interface OutputProps {
    actualOutput: string;
    readOnly: boolean;
}
const ActualOutput: React.FC<OutputProps> = ({ actualOutput, readOnly }) => {
    return (
        <div className="flex-1">
            <p className="px-2 py-1 bg-gray-300">Actual Output</p>
            {/* Readonly testarea */}
            <textarea
                value={actualOutput}
                onChange={() => {}}
                className={`text-sm w-full px-3 py-2 input ${
                    readOnly && 'focus:!outline-none'
                }`}
            />
        </div>
    );
};

// Expected output block
interface ExpectedOutputProps {
    onOutputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    expectedOutput: string;
    readOnly: boolean;
}
const ExpectedOutput: React.FC<ExpectedOutputProps> = ({
    onOutputChange,
    expectedOutput,
    readOnly,
}) => {
    return (
        <div className="flex-1 flex flex-col">
            <p className="px-2 py-1 bg-gray-300">Expected Output</p>
            <textarea
                onChange={onOutputChange}
                value={expectedOutput}
                className={`flex-1 text-sm min-w-[100%] !px-3 py-2 input ${
                    readOnly && 'focus:!outline-none'
                }`}
            />
        </div>
    );
};

interface ControlProps {
    onHidden(): void;
    hidden: boolean;
    onDelete?: () => void;
}
// Controlling hidden test and remove test functionalities
const TestCaseControl: React.FC<ControlProps> = ({ onHidden, hidden, onDelete }) => {
    return (
        <div className="flex-between">
            <p className="flex">
                <input type="checkbox" onChange={onHidden} checked={hidden ?? false} />
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

function getStatusClass(output: ITestResult | undefined) {
    if (!output) return '';
    return output.correct ? 'bg-green-200/70' : 'bg-rose-200/70';
}

export default TestCase;
