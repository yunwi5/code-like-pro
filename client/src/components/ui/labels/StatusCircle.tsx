import React from 'react';
import HoveringLabel from './HoveringLabel';

const StatusCircle: React.FC<{ correct: boolean }> = ({ correct }) => {
    return (
        <>
            {correct ? (
                <HoveringLabel label="Correct" className="text-base">
                    <div className="shadow-md bg-emerald-500/80 w-[1.35rem] h-[1.35rem] rounded-full"></div>
                </HoveringLabel>
            ) : (
                <HoveringLabel label="Incorrect" className="text-base">
                    <div className="shadow-md bg-rose-500 w-[1.35rem] h-[1.35rem] rounded-full" />
                </HoveringLabel>
            )}
        </>
    );
};

export default StatusCircle;
