import React from 'react';
import './HoveringLabel.scss';

interface Props {
    label: string | JSX.Element;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    children: React.ReactNode;
}

// Wrapper for hovering element that needs pop up labels.
// For example, when hovering the Facebook icon, the text label 'Facebook' appears below the icon.
// This component is purely for advanced hovering effects.
// See the example of this component inside the Footer.tsx.
const HoveringLabel: React.FC<Props> = ({ children, label, onClick, className = '' }) => {
    return (
        <div className={`relative cursor-pointer hover-label ${className}`} onClick={onClick}>
            {children}
            <div className="px-2 py-2 bg-gray-600/90 text-gray-50 hover-label__panel">
                <div className="hover-label__text">{label}</div>
            </div>
        </div>
    );
};

export default HoveringLabel;
