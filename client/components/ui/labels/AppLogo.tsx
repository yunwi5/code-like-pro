import React, { FC } from 'react';
import Link from 'next/link';

import { redHatMono } from '@/app/fonts';
import { Logo } from '@/assets';
import { AppProperty } from '@/constants';

type AppLogoProps = {
  logoSize?: number;
  className?: string;
  onClick?: () => void;
};

const AppLogo: FC<AppLogoProps> = ({ className, onClick, logoSize = 25 }) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`flex-start gap-1 sm:gap-2 text-main-600 font-normal tracking-tight cursor-pointer ${redHatMono.className} ${className}`}
    >
      <Logo size={logoSize} />
      {AppProperty.APP_NAME}
    </Link>
  );
};

export default AppLogo;
