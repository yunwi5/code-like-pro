import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Strengths.module.scss';

interface Props {
    heading: string;
    icon: React.ReactNode;
    content: string;
    link?: string;
}

const StrengthCard: React.FC<Props> = ({ heading, icon, content, link }) => {
    return (
        <>
            <span className={`${styles.icon} transition-all text-[4rem] text-main-400`}>
                {icon}
            </span>
            <h3 className={`text-2xl text-gray-500 capitalize`}>{heading}</h3>
            <p className={'text-center'}>{content}</p>
            {link && (
                <Link className="link-underline-effect w-fit text-blue-500" to={link}>
                    Learn More
                </Link>
            )}
        </>
    );
};

export default StrengthCard;
