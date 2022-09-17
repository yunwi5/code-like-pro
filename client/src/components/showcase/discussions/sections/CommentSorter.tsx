import React, { useState } from 'react';
import { BsArrowLeft, BsSortUpAlt } from 'react-icons/bs';

import {
    CommentSortingKey,
    CommentSortingKeyList,
    SortingDirection,
} from '../../../../models/enums';
import Sortingbar from '../../../ui/inputs/Sortingbar';

type SortingState = { key: CommentSortingKey; direction: SortingDirection };

interface Props {
    sortingState: SortingState;
    setSortingState: React.Dispatch<React.SetStateAction<SortingState>>;
}

// Component for managing sorting operation of the discussion comments.
const CommentSorter: React.FC<Props> = ({ sortingState, setSortingState }) => {
    const [showSorting, setShowSorting] = useState(false);

    const handleSortingKey = (key: CommentSortingKey) => {
        setSortingState((prev) => ({ ...prev, key }));
    };

    const handleSortingDirection = (dir: SortingDirection) => {
        setSortingState((prev) => ({ ...prev, direction: dir }));
    };

    return (
        <div className="flex justify-between items-end mb-5">
            {showSorting ? (
                <div className="flex-start gap-3 mb-2">
                    <Sortingbar
                        sortingKeys={CommentSortingKeyList}
                        onKeyChange={(newKey) => handleSortingKey(newKey as CommentSortingKey)}
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

export default CommentSorter;
