import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  href: string;
  className: string;
  activeClassName: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const ActiveLink: React.FC<Props> = ({
  href,
  className,
  activeClassName,
  children,
  onClick,
}) => {
  const pathname = useRouter().pathname;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={isActive ? `${className} ${activeClassName}` : className}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
