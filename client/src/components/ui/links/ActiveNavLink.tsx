import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    to: string;
    className: string;
    activeClassName: string;
    children: React.ReactNode;
}

const ActiveNavLink: React.FC<Props> = ({ to, className, activeClassName, children }) => {
    return (
        <NavLink
            to={to}
            className={(navData) =>
                navData.isActive ? `${className} ${activeClassName}` : className
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveNavLink;
