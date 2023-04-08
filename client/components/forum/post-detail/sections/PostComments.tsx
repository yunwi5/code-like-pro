import React, { useMemo, useState } from 'react';
import useForumPostCommentsMutation from '../../../../hooks/forum/forum-post/useForumPostCommentsMutation';
import { SortingDirection, VotingItemSortingKey } from '../../../../models/enums';
import { IComment, IForumPostPopulated } from '../../../../models/interfaces';
import { sortVotingItems } from '../../../../utils/sorting-utils/voting-items.sorting';
import CommentForm from '../../../ui/comments/CommentForm';
import CommentList from '../../../ui/lists/CommentList';
import VotingItemSorter from '../../../ui/sorting/VotingItemSorter';

const PostComments: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
  const { postComment, updateComment, deleteComment } = useForumPostCommentsMutation(
    post._id,
  );

  const [sortingState, setSortingState] = useState({
    key: VotingItemSortingKey.DATETIME,
    direction: SortingDirection.DESCENDING,
  });

  // Handle comment submission from the user.
  const handleSubmitComment = async (text: string) => {
    // Send Http POST request to send the user comment to the server.
    const commentProp = { text }; // Comment only requires 'text' prop when sending it to the server.
    if (!post) return;

    await postComment(commentProp);
  };

  // Whenver sorting state changes, sort the comments again.
  const sortedComments = useMemo(() => {
    // Pass sorting key and direction to sort the list of comments.
    return sortVotingItems<IComment>(
      post.comments,
      sortingState.key,
      sortingState.direction,
    ).slice();
  }, [sortingState, post.comments]);

  return (
    <div className="flex-1 flex flex-col px-4 xl:px-8 py-3 border-t-2 border-gray-200">
      <div className="flex flex-wrap flex-row justify-between items-center gap-x-3 mb-4">
        {/* Component that handles the selection of sorting key and direction from the user. */}
        <VotingItemSorter sortingState={sortingState} setSortingState={setSortingState} />

        {/* Displays number of comments available in the discussion forum. */}
        <h5 className="text-gray-500 font-semibold text-base sm:text-lg">
          {post.comments.length} Comment{post.comments.length > 1 && 's'}
        </h5>
      </div>

      {/* Form that lets user to add their comments to the discussion. */}
      <CommentForm inputType="textarea" onSubmit={handleSubmitComment} />

      {/* Render the list of comments with pagination. */}
      <CommentList
        comments={sortedComments}
        onUpdateComment={updateComment}
        onDeleteComment={deleteComment}
        className="mt-8"
      />
    </div>
  );
};

export default PostComments;
