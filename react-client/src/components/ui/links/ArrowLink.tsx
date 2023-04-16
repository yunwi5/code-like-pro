import React from 'react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './ArrowLink.module.scss';

interface Props {
    to: string;
    children: React.ReactNode;
    className?: string;
}

// Link component with arrow animation (moving left and right).
const ArrowLink: React.FC<Props> = ({ to, children, className }) => {
    return (
        <Link
            className={`${styles['arrow-btn']} btn btn-small w-fit flex-center gap-2 rounded shadow-none text-blue-500 hover:bg-blue-100/90 hover:text-blue-600 ${className}`}
            to={to}
        >
            {children}
            <MdDoubleArrow className={`${styles['icon']} text-[1.2em]`} />
        </Link>
    );
};

export default ArrowLink;
