import React, { useState } from 'react';
import { VotingItemSortingKey, SortingDirection } from '../../../models/enums';
import CommentSorter from '../../ui/sorting/VotingItemSorter';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import useExerciseShowcaseQuery from '../../../hooks/queries/useExerciseShowcaseQuery';
import ShowcaseList from '../../ui/lists/ShowcaseList';

const ShowcaseShowcases: React.FC = () => {
    const { exercise } = useShowcase();
    const [sortingState, setSortingState] = useState({
        key: VotingItemSortingKey.NONE,
        direction: SortingDirection.DESCENDING,
    });
    if (!exercise) return null;
    const { showcases } = useExerciseShowcaseQuery(exercise._id);

    return (
        <div className="flex flex-col px-4">
            <div className="flex flex-row">
                {/* Component that handles the selection of sorting key and direction from the user. */}
                <CommentSorter sortingState={sortingState} setSortingState={setSortingState} />
                <h5 className="text-gray-500 font-bold text-lg ml-auto">
                    {showcases.length} Showcases
                </h5>
            </div>
            <ShowcaseList showcases={showcases} exercise={exercise} />
        </div>
    );
};

export default ShowcaseShowcases;
