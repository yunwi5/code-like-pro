import React from 'react';
import { BadgeSortingKey, SortingDirection } from '../../../models/enums';

type BadgeSortingState = { key: BadgeSortingKey; direction: SortingDirection };

interface Props {
    sortingState: BadgeSortingState;
    setSortingState: (state: BadgeSortingState) => void;
}

const BadgeSorter: React.FC<Props> = ({ sortingState, setSortingState }) => {
    const sortByTitle = () => {
        setSortingState({
            key: BadgeSortingKey.NAME,
            direction: SortingDirection.ASCENDING,
        });
    };

    const sortByNewest = () => {
        setSortingState({
            key: BadgeSortingKey.DATETIME,
            direction: SortingDirection.DESCENDING,
        });
    };

    const sortByRarest = () => {
        setSortingState({
            key: BadgeSortingKey.RARITY,
            direction: SortingDirection.DESCENDING,
        });
    };

    const sortedByTitle = sortingState.key === BadgeSortingKey.NAME;
    const sortedByNewest = sortingState.key === BadgeSortingKey.DATETIME;
    const sortedByRarest = sortingState.key === BadgeSortingKey.RARITY;

    return (
        <div className="flex items-center gap-2 font-semibold">
            <button
                className={`${btnClass} ${sortedByTitle ? 'text-main-500' : ''}`}
                onClick={sortByTitle}
            >
                Title A-Z
            </button>
            <button
                className={`${btnClass} ${sortedByNewest ? 'text-main-500' : ''}`}
                onClick={sortByNewest}
            >
                Newest
            </button>
            <button
                className={`${btnClass} ${sortedByRarest ? 'text-main-500' : ''}`}
                onClick={sortByRarest}
            >
                Rarest
            </button>
        </div>
    );
};

const btnClass =
    'px-2 py-1 rounded-sm hover:bg-gray-100 hover:text-main-500 transition-all';

export default BadgeSorter;
