'use client';
import React, { FC, useMemo, useState } from 'react';

import useExerciseCommentsQuery from '@/hooks/comment/exercise-comments/useExerciseCommentsQuery';

import useExerciseCommentsMutation from '../../../hooks/comment/exercise-comments/useExerciseCommentsMutation';
import { SortingDirection, VotingItemSortingKey } from '../../../models/enums';
import { IComment } from '../../../models/interfaces';
import { useShowcaseContext } from '../../../store/context/ShowcaseContext';
import { useUserContext } from '../../../store/context/UserContext';
import { sortVotingItems } from '../../../utils/sorting-utils/voting-items.sorting';
import CommentForm from '../../ui/comments/CommentForm';
import CommentList from '../../ui/lists/CommentList';
import CommentSorter from '../../ui/sorting/VotingItemSorter';

import CommentSelectOptions from './CommentSelectOptions';

type ShowcaseDiscussionsProps = {
  comments: IComment[];
};

const ShowcaseDiscussions: FC<ShowcaseDiscussionsProps> = ({ comments: initialCommentsData }) => {
  const { userDetail } = useUserContext();
  const { exercise } = useShowcaseContext();
  const { comments = initialCommentsData } = useExerciseCommentsQuery(exercise?._id ?? '', 1000);
  const { postComment, updateComment, deleteComment } = useExerciseCommentsMutation(
    exercise?._id || '',
  );

  const [sortingState, setSortingState] = useState({
    key: VotingItemSortingKey.DATETIME,
    direction: SortingDirection.DESCENDING,
  });
  const [showOnlyMyComments, setShowOnlyMyComments] = useState(false);

  const handleSubmitComment = async (text: string) => {
    if (!exercise) return;

    const newComment = { text };
    await postComment(newComment);
  };

  const selectedComments = useMemo(() => {
    if (!showOnlyMyComments) return comments;
    return comments.filter((comment) => comment.user._id === userDetail?._id);
  }, [showOnlyMyComments, comments, userDetail?._id]);

  const sortedComments = useMemo(() => {
    return sortVotingItems<IComment>(
      selectedComments,
      sortingState.key,
      sortingState.direction,
    ).slice();
  }, [sortingState, selectedComments]);

  return (
    <div className="flex-1 flex flex-col px-2 sm:px-4 md:px-8">
      <CommentSorter
        sortingState={sortingState}
        setSortingState={setSortingState}
        className="mb-5"
      />

      <CommentForm onSubmit={handleSubmitComment} />

      <div className="flex-between flex-wrap my-8 gap-3">
        {/* Provide options 'All Comments' and 'My Comments' to provide filtering options. */}
        <CommentSelectOptions
          showOnlyMyComments={showOnlyMyComments}
          setShowOnlyMyComments={setShowOnlyMyComments}
        />
        <h5 className="text-gray-500 font-bold text-base sm:text-lg">{comments.length} Comments</h5>
      </div>

      <CommentList
        comments={sortedComments}
        onUpdateComment={updateComment}
        onDeleteComment={deleteComment}
      />
    </div>
  );
};

export default ShowcaseDiscussions;
