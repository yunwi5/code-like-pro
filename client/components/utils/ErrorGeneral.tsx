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
  linkButton: 'w-[90%] sm:w-[13.5rem]',
  linkIcon: 'inline-block mr-1 text-[1.5em]',
};

const ErrorGeneral: FC<ErrorGeneralProps> = ({ message = 'Something went wrong...' }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] min-w-[50vw] text-center">
      <div className="flex-center flex-col gap-4">
        <BiMessageAltError className="text-rose-500 text-[12rem] md:text-[18rem]" />
        <div className="-mt-[1.5rem] flex-center gap-2 text-3xl font-bold text-gray-600">
          {message}
        </div>

        <div className="mt-5 flex items-center flex-col sm:flex-row gap-4 text-xl capitalize">
          <Link href="/">
            <Button theme="indigo" mode="empty" className={styles.linkButton}>
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
    </div>
  );
};

export default ErrorGeneral;
