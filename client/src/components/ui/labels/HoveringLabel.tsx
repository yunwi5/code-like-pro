import React from 'react';
import './HoveringLabel.scss';

interface Props {
    children: React.ReactNode;
    label: string | JSX.Element;
}

const HoverLabel: React.FC<Props> = ({ children, label }) => {
    return (
        <div className={`relative cursor-pointer hover-label`}>
            {children}
            <div className="px-2 py-2 bg-gray-600/90 text-gray-50 hover-label__panel">
                <div className="hover-label__text">{label}</div>
            </div>
        </div>
    );
};

export default HoverLabel;
