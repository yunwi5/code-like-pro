import React from 'react';
import { GoGitMerge } from 'react-icons/go';
import { HiPlus } from 'react-icons/hi';

import HoveringLabel from '../../../../ui/labels/HoveringLabel';

interface Props {
    onAddCase(): void;
    onMerge(): void;
    mergeReady: boolean;
}

const styles = {
    btnClass:
        'px-1 py-1 text-2xl rounded-md shadow bg-slate-200 text-slate-600 hover:bg-slate-600 hover:text-white',
    disabledBtnClass: 'px-1 py-1 text-2xl rounded-md shadow bg-slate-200 text-slate-600',
};

const TestCaseUserActions: React.FC<Props> = ({ onAddCase, onMerge, mergeReady }) => {
    return (
        <div className="pr-4 flex gap-2">
            <HoveringLabel label="Add" className="!text-sm" onClick={onAddCase}>
                <button className={styles.btnClass}>
                    <HiPlus />
                </button>
            </HoveringLabel>

            {mergeReady ? (
                <HoveringLabel label="Merge" className="!text-sm" onClick={onMerge}>
                    <button className={styles.btnClass}>
                        <GoGitMerge />
                    </button>
                </HoveringLabel>
            ) : (
                <button disabled={true} className={styles.disabledBtnClass}>
                    <GoGitMerge />
                </button>
            )}
        </div>
    );
};

export default TestCaseUserActions;
