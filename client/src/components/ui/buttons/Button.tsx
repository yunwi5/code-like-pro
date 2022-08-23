import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit';
    onClick?: (e: React.MouseEvent) => void;
}

const Button: React.FC<Props> = ({ className, children, onClick }) => {
    return (
        <button
            className={`px-3 py-2 text-lg text-main-50 transition-all bg-main-500/90 hover:bg-main-600 rounded-md shadow-sm hover:shadow-md cursor-pointer ${
                className ?? ''
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
