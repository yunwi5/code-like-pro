'use client';
import React, { FC, useState } from 'react';

import ShowcasePostModal from './modal/ShowcasePostModal';
import ShowcaseHeader from './ShowcaseHeader';
import ShowcaseNav from './ShowcaseNav';

type ShowcaseMainProps = { children: React.ReactNode };

const ShowcaseMain: FC<ShowcaseMainProps> = ({ children }) => {
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <div className="flex flex-col gap-5 w-[95vw] lg:w-[92vw] xl:w-[85vw] max-w-[80rem] text-gray-700">
      <ShowcaseHeader />

      <ShowcaseNav setShowPostModal={setShowPostModal} />

      <main className="min-h-[max(60vh,35rem)] flex flex-col px-1 sm:px-3 lg:px-6 xl:px-8 py-5 bg-slate-100 shadow-md rounded">
        {children}
      </main>

      <ShowcasePostModal visible={showPostModal} onClose={() => setShowPostModal(false)} />
    </div>
  );
};

export default ShowcaseMain;
