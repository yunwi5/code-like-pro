import React, { useEffect, useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import HoveringLabel from '../../ui/tooltip/HoveringLabel';
import Backdrop from '../../ui/modals/Backdrop';
import RankingSideBar from '../RankingSideBar';
import RankingHeader from '../sections/RankingHeader';

// Header used for mobile screen size < 768px.
const RankingMobileHeader: React.FC = () => {
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);

    // Whenever the route changes, close the sidebar.
    useEffect(() => {
        setShowSidebar(false);
    }, [location.pathname]);

    return (
        <div className="md:hidden relative flex justify-between px-3">
            <RankingHeader />
            <HoveringLabel
                label="Categories"
                className="h-fit text-[0.8rem]"
                onClick={(ps) => setShowSidebar((ps) => !ps)}
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
