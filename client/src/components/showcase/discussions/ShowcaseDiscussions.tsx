import React, { useMemo, useState } from 'react';

import { postExerciseComment } from '../../../apis/exercise';
import { VotingItemSortingKey, SortingDirection } from '../../../models/enums';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import { useUserContext } from '../../../store/context/UserContext';
import { toastNotify } from '../../../utils/notification';
import { sortVotingItems } from '../../../utils/sorting-utils/voting-items-sorting';
import CommentForm from '../../ui/comments/CommentForm';
import CommentList from '../../ui/lists/CommentList';
import CommentSelectOptions from './CommentSelectOptions';
import CommentSorter from '../../ui/sorting/VotingItemSorter';
import { IComment } from '../../../models/interfaces';

const ShowcaseDiscussions: React.FC = () => {
    const { userDetail } = useUserContext();
    const { exercise, comments, refetchQuery } = useShowcase();

    const [sortingState, setSortingState] = useState({
        key: VotingItemSortingKey.NONE,
        direction: SortingDirection.DESCENDING,
    });
    const [showOnlyMyComments, setShowOnlyMyComments] = useState(false);

    // Handle comment submission from the user.
    const handleSubmitComment = async (text: string) => {
        // Send Http POST request to send the user comment to the server.
        const newComment = { text }; // Comment only requires 'text' prop when sending it to the server.
        if (!exercise) return;

        // Send Http POST request to add the user's comment to the server.
        const { ok, message } = await postExerciseComment(exercise._id, newComment);

        if (ok) toastNotify('Post comment!', 'success');
        else toastNotify(`Oops, ${message}`, 'error');

        // Refetch the comments data from the server as the comments should be updated with the new comment.
        refetchQuery('comments');
    };

    // If user choose 'My Comments' option, then only select the user's comments.
    const selectedComments = useMemo(() => {
        // If showOnlyMyComments == false, show all comments (no filters).
        if (!showOnlyMyComments) return comments;
        // If showOnlyMyComments == true, show only current user's comments.
        return comments.filter((comment) => comment.user._id === userDetail?._id);
    }, [showOnlyMyComments, comments]);

    // Whenver sorting state changes, sort the comments again.
    const sortedComments = useMemo(() => {
        // Pass sorting key and direction to sort the list of comments.
        return sortVotingItems(
            selectedComments,
            sortingState.key,
            sortingState.direction,
        ).slice() as IComment[];
    }, [sortingState, selectedComments]);

    return (
        <div className="flex-1 flex flex-col px-8">
            {/* Component that handles the selection of sorting key and direction from the user. */}
            <CommentSorter sortingState={sortingState} setSortingState={setSortingState} />

            {/* Form that lets user to add their comments to the discussion. */}
            <CommentForm onSubmit={handleSubmitComment} />

            <div className="flex-between">
                {/* Provide options 'All Comments' and 'My Comments' to provide filtering options. */}
                <CommentSelectOptions
                    showOnlyMyComments={showOnlyMyComments}
                    setShowOnlyMyComments={setShowOnlyMyComments}
                />
                {/* Displays number of comments available in the discussion forum. */}
                <h5 className="text-gray-500 font-bold text-lg">{comments.length} Comments</h5>
            </div>

            {/* Render the list of comments with pagination. */}
            <CommentList comments={sortedComments} />
        </div>
    );
};

export default ShowcaseDiscussions;
