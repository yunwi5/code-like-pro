import React from 'react';
import RankingMain from '../RankingMain';
import RankingSideBar from '../RankingSideBar';
import RankingHeader from '../sections/RankingHeader';

// Container that wraps the whole ranking section.
// Mobile layout breakpoint is md - 768px
// Above md, sidebar and ranking are dislayed side by side.
// Below md, sidebar switches to absolute position, and only the ranking is displayed.
const RankingContainer: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center gap-x-10 xl:gap-x-20 gap-y-2 px-4 md:px-8 xl:px-16 py-10">
            {/* Ranking page mobile header */}
            <div className="md:hidden flex justify-start px-3">
                <RankingHeader />
            </div>
            <RankingSideBar className="hidden md:flex" />
            <RankingMain />
        </div>
    );
};

export default RankingContainer;
