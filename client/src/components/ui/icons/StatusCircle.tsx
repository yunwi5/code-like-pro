import React from 'react';
import HoveringLabel from '../labels/HoveringLabel';

interface Props {
    correct: boolean;
    className?: string;
}

const StatusCircle: React.FC<Props> = ({ correct, className = '' }) => {
    return (
        <>
            {correct ? (
                <HoveringLabel label="Correct" className={`text-base ${className}`}>
                    <div className="shadow-md bg-emerald-500/80 w-[1.35rem] h-[1.35rem] rounded-full"></div>
                </HoveringLabel>
            ) : (
                <HoveringLabel label="Incorrect" className={`text-base ${className}`}>
                    <div className="shadow-md bg-rose-500 w-[1.35rem] h-[1.35rem] rounded-full" />
                </HoveringLabel>
            )}
        </>
    );
};

export default StatusCircle;
