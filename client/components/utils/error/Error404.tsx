import React, { FC } from 'react';
import { BiHome } from 'react-icons/bi';
import { IoNavigate } from 'react-icons/io5';
import { TbError404 } from 'react-icons/tb';
import Link from 'next/link';

import Button from '../../ui/buttons/Button';

import { styles } from './error-common';

type LinkInfo = { href: string; text: string | JSX.Element };

interface Error404Props {
  message?: string;
  additionalLink?: LinkInfo;
}

const Error404: FC<Error404Props> = ({ message = 'Page Not Found', additionalLink }) => {
  return (
    <div className={styles.errorContainer}>
      <TbError404 className="text-main-500 text-[17.5rem] md:text-[25rem]" />
      <div className="-mt-[3rem] flex-center gap-2 text-3xl font-bold text-gray-600">{message}</div>

      <div className={styles.linksWrapper}>
        <Link href="/" className={styles.linkButton}>
          <Button className="inline-block w-full" theme="indigo" mode="empty">
            <BiHome className={styles.linkIcon} /> Back to Home
          </Button>
        </Link>
        {additionalLink && (
          <Link href={additionalLink.href}>
            <Button theme="pink" mode="empty" className={styles.linkButton}>
              <IoNavigate className={styles.linkIcon} />
              {additionalLink.text}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Error404;
