import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    to: string;
    className: string;
    activeClassName: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const ActiveNavLink: React.FC<Props> = ({
    to,
    className,
    activeClassName,
    children,
    onClick,
}) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={(navData) =>
                navData.isActive ? `${className} ${activeClassName}` : className
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveNavLink;
