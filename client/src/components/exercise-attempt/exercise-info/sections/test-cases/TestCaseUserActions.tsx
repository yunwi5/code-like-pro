import React from 'react';
import { HiPlus } from 'react-icons/hi';
import HoveringLabel from '../../../../ui/labels/HoveringLabel';

interface Props {
    onAddCase(): void;
}

const TestCaseUserActions: React.FC<Props> = ({ onAddCase }) => {
    return (
        <div className="pr-4">
            <HoveringLabel label="Add Case" className="!text-sm" onClick={onAddCase}>
                <button className="px-1 py-1 text-2xl rounded-md shadow bg-slate-200 text-slate-600 hover:bg-slate-600 hover:text-white">
                    <HiPlus />
                </button>
            </HoveringLabel>
        </div>
    );
};

export default TestCaseUserActions;
