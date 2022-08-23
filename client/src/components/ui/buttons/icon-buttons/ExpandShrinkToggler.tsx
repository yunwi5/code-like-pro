import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';

interface Props {
    isShrinked: boolean;
    setIsShrinked: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

const ExpandShrinkToggler: React.FC<Props> = ({ isShrinked, setIsShrinked, className }) => {
    const icon = isShrinked ? (
        <AiOutlinePlusSquare size={27} />
    ) : (
        <AiOutlineMinusSquare size={27} />
    );

    return (
        <span
            onClick={() => setIsShrinked((ps) => !ps)}
            className={`text-xl text-gray-600 cursor-pointer ${className ?? ''}`}
        >
            {icon}
        </span>
    );
};

export default ExpandShrinkToggler;
