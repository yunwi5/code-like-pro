import React, { FC } from 'react';
import { BiHome, BiMessageAltError } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../ui/buttons/Button';

interface ErrorGeneralProps {
  message?: string;
}

const styles = {
  linkButton: 'w-[Min(20rem,85vw)] sm:w-[13.5rem]',
  linkIcon: 'inline-block mr-1 text-[1.5em]',
};

const ErrorGeneral: FC<ErrorGeneralProps> = ({ message = 'Something went wrong...' }) => {
  const router = useRouter();

  return (
    <div className="flex-center flex-col gap-4 min-h-[90vh] min-w-full sm:min-w-[50vw] text-center">
      <BiMessageAltError className="text-rose-500 text-[12rem] md:text-[18rem]" />
      <div className="-mt-[1.5rem] flex-center gap-2 text-3xl font-bold text-gray-600">
        {message}
      </div>

      <div className="mt-5 flex flex-center flex-col sm:flex-row gap-4 w-full text-xl capitalize">
        <Link href="/" className={styles.linkButton}>
          <Button className="inline-block w-full" theme="indigo" mode="empty">
            <BiHome className={styles.linkIcon} /> Back to Home
          </Button>
        </Link>
        <Button
          onClick={() => router.refresh()}
          theme="pink"
          mode="empty"
          className={styles.linkButton}
        >
          <MdOutlineRefresh className={styles.linkIcon} />
          Refresh the page
        </Button>
      </div>
    </div>
  );
};

export default ErrorGeneral;
