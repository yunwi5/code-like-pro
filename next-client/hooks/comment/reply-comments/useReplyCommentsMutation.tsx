import { useQueryClient } from '@tanstack/react-query';

import * as CommentAPI from '../../../apis/comment.api';
import { CommentProp } from '../../../apis/comment.api';
import { toastNotify } from '../../../utils/notification.util';
import { getReplyCommentsKey } from '../keys';
import useListQueryCacheUpdate from '../../cache/useListQueryCacheUpdate';

function useReplyCommentsMutation(commentId: string) {
  const queryClient = useQueryClient();

  const commentQueryKey = getReplyCommentsKey(commentId);
  const { addItemToCache, updateItemInCache, deleteItemInCache } =
    useListQueryCacheUpdate(commentQueryKey);

  const postReplyComment = async (commentProp: CommentProp) => {
    const {
      ok,
      message,
      data: newComment,
    } = await CommentAPI.postReplyComment(commentId, commentProp);

    if (ok && newComment) {
      toastNotify('Posted your reply!', 'success');
      addItemToCache(newComment);
    } else {
      toastNotify(message || 'Something went wrong...', 'error');
    }

    refetch();
  };

  const updateReplyComment = async (replyCommentId: string, updateProp: CommentProp) => {
    const { ok, data: updatedComment } = await CommentAPI.patchComment(replyCommentId, updateProp);

    if (ok && updatedComment) {
      updateItemInCache(updatedComment);
    } else {
      toastNotify('Oops, something went wrong...', 'error');
    }

    refetch();
  };

  const deleteReplyComment = async (replyCommentId: string) => {
    const { ok } = await CommentAPI.deleteComment(replyCommentId);
    if (ok) {
      deleteItemInCache(replyCommentId);
    } else {
      toastNotify('Oops, something went wrong...', 'error');
    }

    refetch();
  };

  const refetch = () => queryClient.refetchQueries([commentQueryKey]);

  return { postReplyComment, updateReplyComment, deleteReplyComment };
}

export default useReplyCommentsMutation;
