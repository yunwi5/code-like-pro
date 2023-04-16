import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';

interface Props {
    isShrinked: boolean;
    setIsShrinked: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

// This component is used for expanding and collapsing the test caes box and code editor box.
// Have a look at test cases on the browser to see this component visually.
const ExpandShrinkToggler: React.FC<Props> = ({ isShrinked, setIsShrinked, className }) => {
    const icon = isShrinked ? (
        <AiOutlinePlusSquare size={27} />
    ) : (
        <AiOutlineMinusSquare size={27} />
    );

    return (
        <span
            onClick={() => setIsShrinked((ps) => !ps)}
            className={`text-xl text-gray-600 cursor-pointer ${className || ''}`}
        >
            {icon}
        </span>
    );
};

export default ExpandShrinkToggler;
