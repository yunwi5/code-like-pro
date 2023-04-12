import React from 'react';

import RankingMobileHeader from '@/components/ranking/mobile/RankingMobileHeader';
import RankingSideBar from '@/components/ranking/RankingSideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-x-10 xl:gap-x-20 gap-y-2 px-4 md:px-8 xl:px-16 py-10">
      <RankingMobileHeader />
      <RankingSideBar className="hidden md:flex" />
      {children}
    </div>
  );
}

export default Layout;
