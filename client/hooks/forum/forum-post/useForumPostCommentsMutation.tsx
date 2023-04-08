import { useQueryClient } from '@tanstack/react-query';

import { postForumPostComment } from '../../../apis/forum.api';
import * as CommentAPI from '../../../apis/comment.api';
import { CommentProp } from '../../../apis/comment.api';
import { IComment, IForumPostPopulated } from '../../../models/interfaces';
import { toastNotify } from '../../../utils/notification.util';
import { getForumPostKey } from '../keys';

function useForumPostCommentsMutation(postId: string) {
  const queryClient = useQueryClient();
  const postQueryKey = getForumPostKey(postId);

  const updateForumPostComments = (newComments: IComment[]) => {
    queryClient.setQueryData(
      [postQueryKey],
      (oldData: { data: IForumPostPopulated } | undefined) => {
        if (!oldData) return oldData;

        const updatedPost: IForumPostPopulated = {
          ...oldData.data,
          comments: newComments,
        };

        return { ...oldData, data: updatedPost };
      },
    );

    refetch();
  };

  const getCurrentPostData = (): IForumPostPopulated | undefined => {
    const oldPostData: { data: IForumPostPopulated } | undefined =
      queryClient.getQueryData([postQueryKey]);

    return oldPostData?.data;
  };

  const postComment = async (commentProp: CommentProp) => {
    if (!postId) return;

    const {
      ok,
      message,
      data: newComment,
    } = await postForumPostComment(postId, commentProp);

    if (ok && newComment) {
      const oldPost = getCurrentPostData();
      if (!oldPost) return;

      toastNotify('Post comment!', 'success');

      const newComments = [...oldPost.comments, newComment];
      updateForumPostComments(newComments);
    } else {
      toastNotify(`Oops, ${message}`, 'error');
    }
  };

  const updateComment = async (commentId: string, updateProp: CommentProp) => {
    const {
      ok,
      message,
      data: updatedComment,
    } = await CommentAPI.patchComment(commentId, updateProp);

    if (ok && updatedComment) {
      const oldPost = getCurrentPostData();
      if (!oldPost) return;

      const newComments = [...oldPost.comments];
      const index = newComments.findIndex((c) => c._id === commentId);
      if (index < 0) return;

      newComments[index] = updatedComment;
      updateForumPostComments(newComments);
    } else {
      toastNotify(`Oops, ${message}`, 'error');
    }
  };

  const deleteComment = async (commentId: string) => {
    const { ok, message } = await CommentAPI.deleteComment(commentId);

    if (ok) {
      const oldPost = getCurrentPostData();
      if (!oldPost) return;

      const newComments = oldPost.comments.filter((c) => c._id !== commentId);
      updateForumPostComments(newComments);
    } else {
      toastNotify(`Oops, ${message}`, 'error');
    }
  };

  const refetch = () => queryClient.refetchQueries([postQueryKey]);

  return { postComment, updateComment, deleteComment };
}

export default useForumPostCommentsMutation;
