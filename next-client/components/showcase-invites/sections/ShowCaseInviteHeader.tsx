import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

import { CodeMonitor } from '../../../assets';

// Header of the showcases invite page.
// Encouraging header and messages on the left, showcase svg image on the right.
// Mobile layout breakpoint is md - 768px
const ShowCaseInviteHeader: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="order-2 md:order-none">
        <h1 className="text-center md:text-left text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-main-500/90 to-fuchsia-600 bg-clip-text text-transparent capitalize">
          Please join our showcase forums!
        </h1>
        <div className="mt-5 px-3 xs:px-10 md:pl-0 flex flex-col gap-y-2 sm:gap-y-[2px] text-center md:text-left text-base lg:text-[1.075rem] text-gray-500">
          <p>
            We encourage you to join our challenge showcase forums and showcase your amazing work!
          </p>
          <p className="gap-1 text-stone-500 text-base">
            <AiOutlineWarning className="inline text-stone-500 -translate-y-[2px]" />
            You can only join showcases for the exercises that you created or solved.
          </p>
        </div>
      </div>
      <CodeMonitor size={'13.5rem'} />
    </header>
  );
};

// This header component does not have to re-redner as the data is static.
// Hence, prevents unnecessary re-render with React.memo().
export default React.memo(ShowCaseInviteHeader);
