import React, { useMemo, useState } from 'react';

import { useUserContext } from '../../../store/context/UserContext';
import { VotingItemSortingKey, SortingDirection } from '../../../models/enums';
import { IComment } from '../../../models/interfaces';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import { sortVotingItems } from '../../../utils/sorting-utils/voting-items.sorting';
import CommentForm from '../../ui/comments/CommentForm';
import CommentList from '../../ui/lists/CommentList';
import CommentSelectOptions from './CommentSelectOptions';
import CommentSorter from '../../ui/sorting/VotingItemSorter';
import ShowcaseLoader from '../ShowcaseLoader';
import useExerciseCommentsMutation from '../../../hooks/comment/exercise-comments/useExerciseCommentsMutation';

const ShowcaseDiscussions: React.FC = () => {
  const { userDetail } = useUserContext();
  const { exercise, comments, commentsLoading } = useShowcase();
  const { postComment, updateComment, deleteComment } = useExerciseCommentsMutation(
    exercise?._id || '',
  );

  const [sortingState, setSortingState] = useState({
    key: VotingItemSortingKey.DATETIME,
    direction: SortingDirection.DESCENDING,
  });
  const [showOnlyMyComments, setShowOnlyMyComments] = useState(false);

  // Handle comment submission from the user.
  const handleSubmitComment = async (text: string) => {
    if (!exercise) return;

    // Send Http POST request to send the user comment to the server.
    const newComment = { text };
    await postComment(newComment);
  };

  // If user choose 'My Comments' option, then only select the user's comments.
  const selectedComments = useMemo(() => {
    // If showOnlyMyComments == false, show all comments (no filters).
    if (!showOnlyMyComments) return comments;
    // If showOnlyMyComments == true, show only current user's comments.
    return comments.filter((comment) => comment.user._id === userDetail?._id);
  }, [showOnlyMyComments, comments, userDetail?._id]);

  // Whenver sorting state changes, sort the comments again.
  const sortedComments = useMemo(() => {
    // Pass sorting key and direction to sort the list of comments.
    return sortVotingItems<IComment>(
      selectedComments,
      sortingState.key,
      sortingState.direction,
    ).slice();
  }, [sortingState, selectedComments]);

  return (
    <div className="flex-1 flex flex-col px-2 sm:px-4 md:px-8">
      {/* Component that handles the selection of sorting key and direction from the user. */}
      <CommentSorter
        sortingState={sortingState}
        setSortingState={setSortingState}
        className="mb-5"
      />

      {/* Form that lets user to add their comments to the discussion. */}
      <CommentForm onSubmit={handleSubmitComment} />

      <div className="flex-between flex-wrap my-8 gap-3">
        {/* Provide options 'All Comments' and 'My Comments' to provide filtering options. */}
        <CommentSelectOptions
          showOnlyMyComments={showOnlyMyComments}
          setShowOnlyMyComments={setShowOnlyMyComments}
        />
        {/* Displays number of comments available in the discussion forum. */}
        <h5 className="text-gray-500 font-bold text-base sm:text-lg">
          {comments.length} Comments
        </h5>
      </div>

      {commentsLoading ? (
        <ShowcaseLoader />
      ) : (
        <CommentList
          comments={sortedComments}
          onUpdateComment={updateComment}
          onDeleteComment={deleteComment}
        />
      )}
    </div>
  );
};

export default ShowcaseDiscussions;
