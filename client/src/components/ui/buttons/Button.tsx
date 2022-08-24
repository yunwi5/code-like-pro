import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit';
    onClick?: (e: React.MouseEvent) => void;
    mode?: 'fill' | 'empty';
}

const Button: React.FC<Props> = ({ className, children, onClick, mode = 'fill' }) => {
    const modeClass = mode === 'fill' ? 'btn-fill' : 'btn-empty';

    return (
        <button className={`btn ${modeClass} ${className ?? ''}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
