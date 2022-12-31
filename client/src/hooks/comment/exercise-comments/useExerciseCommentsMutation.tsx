import { useQueryClient } from '@tanstack/react-query';
import { postExerciseComment } from '../../../apis/exercise.api';
import * as CommentAPI from '../../../apis/comment.api';
import { toastNotify } from '../../../utils/notification';
import { IComment } from '../../../models/interfaces';
import { getExerciseCommentsKey } from '../keys';

function useExerciseCommentsMutation(exerciseId: string) {
    const queryKey = getExerciseCommentsKey(exerciseId);

    const queryClient = useQueryClient();

    const postComment = async (commentProp: { text: string }) => {
        // Send Http POST request to add the user's comment to the server.
        const {
            ok,
            message,
            data: newComment,
        } = await postExerciseComment(exerciseId, commentProp);

        if (ok && newComment) {
            toastNotify('Post comment!', 'success');

            queryClient.setQueryData(
                [queryKey],
                (oldData: { data: IComment[] } | undefined) => {
                    if (!oldData) return oldData;

                    const oldComments = oldData.data;
                    const newData = { ...oldData, data: [...oldComments, newComment] };
                    return newData;
                },
            );
        } else toastNotify(`Oops, ${message}`, 'error');

        refetch();
    };

    const updateComment = async (commentId: string, updateProp: { text: string }) => {
        const { ok, data: updatedComment } = await CommentAPI.patchComment(
            commentId,
            updateProp,
        );

        if (ok && updatedComment) {
            queryClient.setQueryData(
                [queryKey],
                (oldData: { data: IComment[] } | undefined) => {
                    if (!oldData) return oldData;

                    const newComments = [...oldData.data];
                    const oldCommentIndex = newComments.findIndex(
                        (c) => c._id === commentId,
                    );
                    if (oldCommentIndex < 0) return oldData;

                    newComments[oldCommentIndex] = updatedComment;
                    const newData = { ...oldData, data: newComments };
                    return newData;
                },
            );
        } else {
            toastNotify('Oops, something went wrong...', 'error');
        }

        refetch();
    };

    const deleteComment = async (commentId: string) => {
        const { ok } = await CommentAPI.deleteComment(commentId);
        if (ok) {
            queryClient.setQueryData(
                [queryKey],
                (oldData: { data: IComment[] } | undefined) => {
                    if (!oldData) return oldData;

                    const newComments = oldData.data.filter((c) => c._id !== commentId);
                    const newData = { ...oldData, data: newComments };
                    return newData;
                },
            );
        } else {
            toastNotify('Oops, something went wrong...', 'error');
        }

        refetch();
    };

    const refetch = () => queryClient.refetchQueries([queryKey]);

    return { postComment, updateComment, deleteComment };
}

export default useExerciseCommentsMutation;
