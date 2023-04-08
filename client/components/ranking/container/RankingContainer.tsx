import React from 'react';
import { ProgrammingTopic } from '../../../models/enums';
import RankingMobileHeader from '../mobile/RankingMobileHeader';
import RankingMain from '../RankingMain';
import RankingSideBar from '../RankingSideBar';

// Container that wraps the whole ranking section.
// Mobile layout breakpoint is md - 768px
// Above md, sidebar and ranking are dislayed side by side.
// Below md, sidebar switches to absolute position, and only the ranking is displayed.
const RankingContainer: React.FC<{ topic?: ProgrammingTopic }> = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-x-10 xl:gap-x-20 gap-y-2 px-4 md:px-8 xl:px-16 py-10">
      {/* Ranking page mobile header */}
      <RankingMobileHeader />
      <RankingSideBar className="hidden md:flex" />
      <RankingMain />
    </div>
  );
};

export default RankingContainer;
