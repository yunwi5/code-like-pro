import React, { FC } from 'react';
import { IconType } from 'react-icons';

type BannerProps = {
  icon: IconType;
  text: string;
  className?: string;
};

const Banner: FC<BannerProps> = ({ icon, text, className }) => {
  return (
    <span className={`${styles.banner} ${className}`}>
      {icon({ className: styles.bannerIcon })}
      {text}
    </span>
  );
};

const styles = {
  banner: 'inline-block px-2 py-1 text-xs text-white rounded-full',
  bannerIcon: 'inline text-[1.1em]',
};

export default Banner;
