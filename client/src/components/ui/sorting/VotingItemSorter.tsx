import React, { useState } from 'react';
import { BsArrowLeft, BsSortUpAlt } from 'react-icons/bs';

import {
    VotingItemSortingKey,
    VotingItemSortingKeyList,
    SortingDirection,
} from '../../../models/enums';
import Sortingbar from '../inputs/Sortingbar';

type SortingState = { key: VotingItemSortingKey; direction: SortingDirection };

interface Props {
    sortingState: SortingState;
    setSortingState: React.Dispatch<React.SetStateAction<SortingState>>;
    className?: string;
}

// Sorting helpter for voting item like comment and showcase items.
// Can help items to be sorted by votes and date & time.
const VotingItemSorter: React.FC<Props> = ({
    sortingState,
    setSortingState,
    className = '',
}) => {
    const [showSorting, setShowSorting] = useState(false);

    const handleSortingKey = (key: VotingItemSortingKey) => {
        setSortingState((prev) => ({ ...prev, key }));
    };

    const handleSortingDirection = (dir: SortingDirection) => {
        setSortingState((prev) => ({ ...prev, direction: dir }));
    };

    return (
        <div className={`flex justify-between items-end ${className}`}>
            {showSorting ? (
                <div className="flex-start gap-3 mb-2">
                    <Sortingbar
                        sortingKeys={VotingItemSortingKeyList}
                        onKeyChange={(newKey) =>
                            handleSortingKey(newKey as VotingItemSortingKey)
                        }
                        onDirectionChange={handleSortingDirection}
                        sortingKey={sortingState.key}
                        direction={sortingState.direction}
                    />
                    <BsArrowLeft
                        onClick={() => setShowSorting(false)}
                        className="text-xl translate-y-3 hover:text-main-600 cursor-pointer"
                    />
                </div>
            ) : (
                <div
                    onClick={() => setShowSorting(true)}
                    className="px-1 py-1 hover:bg-gray-200 hover:shadow rounded cursor-pointer"
                >
                    <BsSortUpAlt className="text-2xl text-gray-500 hover:text-main-600 cursor-inherit" />
                </div>
            )}
        </div>
    );
};

export default VotingItemSorter;
