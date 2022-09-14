import React, { useMemo, useState } from 'react';

import { postExerciseComment } from '../../../apis/exercise';
import { CommentSortingKey, SortingDirection } from '../../../models/enums';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import { useUserContext } from '../../../store/context/UserContext';
import { toastNotify } from '../../../utils/notification';
import { sortComments } from '../../../utils/sorting-utils/comment-sorting';
import CommentForm from '../../ui/comments/CommentForm';
import CommentList from '../../ui/lists/CommentList';
import CommentSelectOptions from './sections/CommentSelectOptions';
import CommentSorter from './sections/CommentSorter';

const ShowcaseDiscussions: React.FC = () => {
    const { userDetail } = useUserContext();
    const { exercise, comments, refetchQuery } = useShowcase();

    const [sortingState, setSortingState] = useState({
        key: CommentSortingKey.NONE,
        direction: SortingDirection.DESCENDING,
    });
    const [showOnlyMyComments, setShowOnlyMyComments] = useState(false);

    // Handle comment submission from the user.
    const handleSubmitComment = async (text: string) => {
        // Send Http POST request to send the user comment to the server.
        const newComment = { text }; // Comment only requires 'text' prop when sending it to the server.

        if (!exercise) return;
        const { ok, message } = await postExerciseComment(exercise._id, newComment);

        if (ok) toastNotify('Post comment!', 'success');
        else toastNotify(`Oops, ${message}`, 'error');

        // Refetch the comments data from the server as the comments should be updated with the new comment.
        refetchQuery('comments');
    };

    const selectedComments = useMemo(() => {
        if (!showOnlyMyComments) return comments;
        return comments.filter((comment) => comment.user._id === userDetail?._id);
    }, [showOnlyMyComments, comments]);

    const sortedComments = useMemo(() => {
        return sortComments(
            selectedComments,
            sortingState.key,
            sortingState.direction,
        ).slice();
    }, [sortingState, selectedComments]);

    return (
        <div className="flex flex-col px-8">
            <CommentSorter sortingState={sortingState} setSortingState={setSortingState} />

            <CommentForm onSubmit={handleSubmitComment} />

            <div className="flex-between">
                {/* Selecting all comments or only user's comments */}
                <CommentSelectOptions
                    showOnlyMyComments={showOnlyMyComments}
                    setShowOnlyMyComments={setShowOnlyMyComments}
                />
                <h5 className="text-gray-500 font-bold text-lg">{comments.length} Comments</h5>
            </div>
            <CommentList comments={sortedComments} />
        </div>
    );
};

export default ShowcaseDiscussions;
