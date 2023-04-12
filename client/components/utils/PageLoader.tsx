import React, { FC } from 'react';
import { BsPlayCircle } from 'react-icons/bs';
import { ClockLoader } from 'react-spinners';

import styles from './PageLoader.module.scss';

const DEFAULT_LOADER_SIZE = 250;

const PageLoader: FC = () => {
  return (
    <div className="min-h-[83.5vh] flex-center flex-col gap-8">
      <ClockLoader size={DEFAULT_LOADER_SIZE} color="#5552e4" />
      <LoadingText />
    </div>
  );
};

const LoadingText: FC = () => {
  return (
    <div className="flex-center flex-col gap-7 font-semibold text-3xl text-main-500">
      <p>Loading</p>

      <div className={`${styles['arrows-wrapper']} flex gap-2`}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <BsPlayCircle key={i} className={`${styles.arrow} text-4xl text-main-500`} />
          ))}
      </div>
    </div>
  );
};

export default PageLoader;
