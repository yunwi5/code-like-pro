'use client';
import React, { useEffect, useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';

import { useTopicParam } from '@/hooks/utils/useTopicParam';

import Backdrop from '../../ui/modals/Backdrop';
import HoveringLabel from '../../ui/tooltip/HoveringLabel';
import RankingSideBar from '../RankingSideBar';
import RankingHeader from '../sections/RankingHeader';

const RankingMobileHeader: React.FC = () => {
  const topic = useTopicParam();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(false);
  }, [topic]);

  return (
    <div className="md:hidden relative flex justify-between px-3">
      <RankingHeader />
      <HoveringLabel
        label="Categories"
        className="h-fit text-[0.8rem]"
        onClick={() => setShowSidebar((ps) => !ps)}
      >
        <AiOutlineUnorderedList className="mt-6 text-2xl hover:text-main-500 cursor-pointer" />
      </HoveringLabel>

      {/* Backdrop only displayed when showing the sidebar. Otherwise, hidden. */}
      <Backdrop
        className={`md:!hidden ${showSidebar ? '' : 'opacity-0 !-z-[5]'}`}
        onClose={() => setShowSidebar(false)}
      />
      {/* Override stlying for a mobile sidebar. */}
      <RankingSideBar
        showHeader={false}
        className={`z-[200] absolute top-0 rounded-md -left-3 !pt-2 !items-center bg-gray-100 transition-all ${
          showSidebar ? '' : '-translate-x-[30rem]'
        }`}
      />
    </div>
  );
};

export default RankingMobileHeader;
