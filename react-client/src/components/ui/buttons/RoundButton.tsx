import React from 'react';

interface Props {
    children: React.ReactNode;
    theme?: 'light' | 'dark';
    className?: string;
    type?: 'button' | 'submit';
    onClick?: (e: React.MouseEvent) => void;
}

// Different version of buttons. Round and only white and black colors.
const RoundButton: React.FC<Props> = (props) => {
    const { children, theme = 'dark', className = '', type, onClick } = props;

    const themeClass = theme === 'dark' ? 'btn-dark' : 'btn-light';

    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn rounded-full ${themeClass} ${className}`}
        >
            {children}
        </button>
    );
};

export default RoundButton;
