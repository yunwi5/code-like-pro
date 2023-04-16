import { useQueryClient } from '@tanstack/react-query';
import { postExerciseComment } from '../../../apis/exercise.api';
import * as CommentAPI from '../../../apis/comment.api';
import { toastNotify } from '../../../utils/notification.util';
import { getExerciseCommentsKey } from '../keys';
import useListQueryCacheUpdate from '../../cache/useListQueryCacheUpdate';

function useExerciseCommentsMutation(exerciseId: string) {
  const queryClient = useQueryClient();

  const queryKey = getExerciseCommentsKey(exerciseId);
  const { addItemToCache, updateItemInCache, deleteItemInCache } =
    useListQueryCacheUpdate(queryKey);

  const postComment = async (commentProp: { text: string }) => {
    // Send Http POST request to add the user's comment to the server.
    const { ok, message, data: newComment } = await postExerciseComment(exerciseId, commentProp);

    if (ok && newComment) {
      toastNotify('Post comment!', 'success');
      addItemToCache(newComment);
    } else {
      toastNotify(`Oops, ${message}`, 'error');
    }

    refetch();
  };

  const updateComment = async (commentId: string, updateProp: { text: string }) => {
    const { ok, data: updatedComment } = await CommentAPI.patchComment(commentId, updateProp);

    if (ok && updatedComment) {
      updateItemInCache(updatedComment);
    } else {
      toastNotify('Oops, something went wrong...', 'error');
    }

    refetch();
  };

  const deleteComment = async (commentId: string) => {
    const { ok } = await CommentAPI.deleteComment(commentId);
    if (ok) {
      deleteItemInCache(commentId);
    } else {
      toastNotify('Oops, something went wrong...', 'error');
    }

    refetch();
  };

  const refetch = () => queryClient.refetchQueries([queryKey]);

  return { postComment, updateComment, deleteComment };
}

export default useExerciseCommentsMutation;
