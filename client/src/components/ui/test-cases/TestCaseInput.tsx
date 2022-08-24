import React, { useState } from 'react';
import { Language } from '../../../models/enums';
import CodeEditor from '../editor/code-editor/CodeEditor';
import ExpandShrinkToggler from '../buttons/icon-buttons/ExpandShrinkToggler';
import { ImBin2 } from 'react-icons/im';
import { ITestCase, ITestCaseProps } from '../../../models/interfaces';

interface Props {
    language: Language;
    testCase: ITestCase;
    onUpdate: (props: ITestCaseProps) => void;
    onDelete?: () => void;
}

const TestCaseInput: React.FC<Props> = ({ language, testCase, onUpdate, onDelete }) => {
    const [isShrinked, setIsShrinked] = useState(false);

    const handleCodeChange = (code: string) => onUpdate({ code });
    const handleOutputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const expectedOutput: string = e.target.value;
        onUpdate({ expectedOutput });
    };
    const handleHidden = () => {
        onUpdate({ hidden: !testCase.hidden });
    };

    return (
        <div
            className={`flex flex-col gap-2 px-3 py-2 bg-gray-200 rounded-sm shadow-md focus-within:shadow-md`}
        >
            <h3 className="text-lg flex items-center justify-between">
                {testCase.name}
                <ExpandShrinkToggler isShrinked={isShrinked} setIsShrinked={setIsShrinked} />
            </h3>
            {!isShrinked && (
                <>
                    <div className="flex flex-wrap gap-3 justify-between">
                        <div className="flex-1">
                            <CodeEditor
                                language={language}
                                onChange={handleCodeChange}
                                showHeader={false}
                                value={testCase.code}
                                height={'10rem'}
                                validation={false}
                            />
                        </div>
                        <textarea
                            rows={5}
                            onChange={handleOutputChange}
                            value={testCase.expectedOutput}
                            className="min-w-[10rem] flex-1 px-3 py-2 bg-white border-2 border-slate-300 shadow-md rounded-sm focus:outline focus:outline-2 focus:outline-main-300/90"
                        />
                    </div>
                    <div className="flex-between">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                onChange={handleHidden}
                                checked={testCase.hidden ?? false}
                            />{' '}
                            Hidden Test
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
                </>
            )}
        </div>
    );
};
export default TestCaseInput;
