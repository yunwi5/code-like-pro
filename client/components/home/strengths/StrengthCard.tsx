import React from 'react';
import Link from 'next/link';

import styles from './Strengths.module.scss';

interface Props {
  heading: string;
  icon: React.ReactNode;
  content: string;
  link?: string;
  linkText?: string;
}

const StrengthCard: React.FC<Props> = ({ heading, icon, content, link, linkText }) => {
  return (
    <>
      <span className={`${styles.icon} transition-all text-[4rem] text-main-400`}>{icon}</span>
      <h3 className={`text-2xl text-gray-500 capitalize`}>{heading}</h3>
      <p className={'text-center'}>{content}</p>
      {link && (
        <Link
          href={link}
          className="px-2 py-[0.3rem] w-fit transition-all rounded-sm hover:bg-blue-100/90 text-blue-500 hover:text-blue-600 hover:shadow"
        >
          {linkText ?? 'Learn More'}
        </Link>
      )}
    </>
  );
};

export default StrengthCard;
