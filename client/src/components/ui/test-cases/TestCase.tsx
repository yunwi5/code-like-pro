import React, { useState } from 'react';
import { Language } from '../../../models/enums';
import CodeEditor from '../editor/code-editor/CodeEditor';
import ExpandShrinkToggler from '../buttons/icon-buttons/ExpandShrinkToggler';

interface Props {
    language: Language;
    name: string;
    code: string;
    expectedOutput: string;
}

const TestCase: React.FC<Props> = ({ language, name, code, expectedOutput }) => {
    const [isShrinked, setIsShrinked] = useState(false);
    const handleCodeChange = (newCode: string) => {};

    return (
        <div
            className={`flex flex-col gap-2 px-3 py-2 bg-gray-200 rounded-sm shadow-sm focus-within:shadow-md`}
        >
            <h3 className="text-lg flex items-center justify-between">
                {name}{' '}
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
                                value={code}
                                height={'10rem'}
                            />
                        </div>
                        <textarea
                            rows={5}
                            className="min-w-[10rem] flex-1 px-3 py-2 bg-white border-2 border-slate-300 shadow-md rounded-sm focus:outline focus:outline-2 focus:outline-main-300/90"
                            defaultValue={expectedOutput}
                        />
                    </div>
                    <p className="flex gap-2">
                        <input type="checkbox" /> Hidden Test
                    </p>
                </>
            )}
        </div>
    );
};
export default TestCase;
