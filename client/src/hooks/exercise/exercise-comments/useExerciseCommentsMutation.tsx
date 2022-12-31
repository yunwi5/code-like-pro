import { useQueryClient } from '@tanstack/react-query';
import { getExerciseCommentsKey } from '../keys';
import { postExerciseComment } from '../../../apis/exercise.api';
import { toastNotify } from '../../../utils/notification';
import { IComment } from '../../../models/interfaces';
import {
    deleteComment as deleteCommentRequest,
    patchComment,
} from '../../../apis/comment.api';

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

        refetchComments();
    };

    const updateComment = async (commentId: string, updateProp: { text: string }) => {
        const { ok, data: updatedComment } = await patchComment(commentId, updateProp);

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

        refetchComments();
    };

    const deleteComment = async (commentId: string) => {
        const { ok } = await deleteCommentRequest(commentId);
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

        refetchComments();
    };

    const refetchComments = () => queryClient.refetchQueries([queryKey]);

    return { postComment, updateComment, deleteComment };
}

export default useExerciseCommentsMutation;
