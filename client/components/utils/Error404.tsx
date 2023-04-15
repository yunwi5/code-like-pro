import React, { FC } from 'react';
import { BiHome } from 'react-icons/bi';
import { IoNavigate } from 'react-icons/io5';
import { TbError404 } from 'react-icons/tb';
import Link from 'next/link';

import Button from '../ui/buttons/Button';

type LinkInfo = { href: string; text: string | JSX.Element };

interface Error404Props {
  message?: string;
  additionalLink?: LinkInfo;
}

const styles = {
  linkButton: 'w-[Min(20rem,85vw)] sm:w-[13.5rem]',
  linkIcon: 'inline-block mr-1 text-[1.5em]',
};

const Error404: FC<Error404Props> = ({ message = 'Page Not Found', additionalLink }) => {
  return (
    <div className="flex-center flex-col gap-4 min-h-[90vh] min-w-full sm:min-w-[50vw] text-center">
      <TbError404 className="text-main-500 text-[17.5rem] md:text-[25rem]" />
      <div className="-mt-[3rem] flex-center gap-2 text-3xl font-bold text-gray-600">{message}</div>

      <div className="mt-5 flex-center flex-col sm:flex-row gap-4 w-full text-xl capitalize">
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
