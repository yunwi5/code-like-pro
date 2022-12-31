import { useQueryClient } from '@tanstack/react-query';

import * as CommentAPI from '../../../apis/comment.api';
import { CommentProp } from '../../../apis/comment.api';
import { toastNotify } from '../../../utils/notification';
import { IComment } from '../../../models/interfaces';
import { getReplyCommentsKey } from '../keys';

function useReplyCommentsMutation(commentId: string) {
    const queryClient = useQueryClient();

    const commentQueryKey = getReplyCommentsKey(commentId);

    const postReplyComment = async (commentProp: CommentProp) => {
        const {
            ok,
            message,
            data: newComment,
        } = await CommentAPI.postReplyComment(commentId, commentProp);

        if (ok && newComment) {
            toastNotify('Posted your reply!', 'success');
            queryClient.setQueryData(
                [commentQueryKey],
                (oldData: IComment[] | undefined) => {
                    if (!oldData) return oldData;
                    return [...oldData, newComment];
                },
            );
        } else {
            toastNotify(message || 'Something went wrong...', 'error');
        }

        refetch();
    };

    const updateReplyComment = async (
        replyCommentId: string,
        updateProp: CommentProp,
    ) => {
        const { ok, data: updatedComment } = await CommentAPI.patchComment(
            replyCommentId,
            updateProp,
        );

        if (ok && updatedComment) {
            queryClient.setQueryData(
                [commentQueryKey],
                (oldData: IComment[] | undefined) => {
                    if (!oldData) return oldData;

                    const newComments = [...oldData];
                    const index = newComments.findIndex((c) => c._id === replyCommentId);
                    if (index < 0) return oldData;

                    newComments[index] = updatedComment;
                    return newComments;
                },
            );
        } else {
            toastNotify('Oops, something went wrong...', 'error');
        }

        refetch();
    };

    const deleteReplyComment = async (replyCommentId: string) => {
        const { ok } = await CommentAPI.deleteComment(replyCommentId);
        if (ok) {
            queryClient.setQueryData(
                [commentQueryKey],
                (oldData: IComment[] | undefined) => {
                    if (!oldData) return oldData;
                    return oldData.filter((c) => c._id !== replyCommentId);
                },
            );
        } else {
            toastNotify('Oops, something went wrong...', 'error');
        }

        refetch();
    };

    const refetch = () => queryClient.refetchQueries([commentQueryKey]);

    return { postReplyComment, updateReplyComment, deleteReplyComment };
}

export default useReplyCommentsMutation;
