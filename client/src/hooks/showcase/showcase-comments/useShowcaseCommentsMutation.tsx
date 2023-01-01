import { useQueryClient } from '@tanstack/react-query';

import useListQueryCacheUpdate from '../../cache/useListQueryCacheUpdate';
import { CommentProp } from '../../../apis/comment.api';
import * as CommentAPI from '../../../apis/comment.api';
import { postShowcaseComment } from '../../../apis/exercise.api';
import { toastNotify } from '../../../utils/notification';
import { getShowcaseCommentsKey } from '../keys';

function useShowcaseCommentsMutation(showcaseId: string) {
    const queryClient = useQueryClient();

    // Use React-Query to fetch the comment data of this showcase.
    const showcaseQueryKey = getShowcaseCommentsKey(showcaseId);
    const { addItemToCache, updateItemInCache, deleteItemInCache } =
        useListQueryCacheUpdate(showcaseQueryKey);

    const postComment = async (commentProp: CommentProp) => {
        const {
            ok,
            message,
            data: newComment,
        } = await postShowcaseComment(showcaseId, commentProp);

        if (ok && newComment) {
            toastNotify('Post showcase comment!', 'success');
            addItemToCache(newComment);
        } else {
            toastNotify(`Oops, ${message}`, 'error');
        }

        refetch();
    };

    const updateComment = async (commentId: string, updateProp: CommentProp) => {
        const {
            ok,
            message,
            data: updatedComment,
        } = await CommentAPI.patchComment(commentId, updateProp);

        if (ok && updatedComment) {
            updateItemInCache(updatedComment);
        } else {
            toastNotify(`Oops, ${message}`, 'error');
        }

        refetch();
    };

    const deleteComment = async (commentId: string) => {
        const { ok, message } = await CommentAPI.deleteComment(commentId);
        if (ok) {
            deleteItemInCache(commentId);
        } else {
            toastNotify(`Oops, ${message}`, 'error');
        }

        refetch();
    };

    const refetch = () => queryClient.refetchQueries([showcaseQueryKey]);

    return { postComment, updateComment, deleteComment };
}

export default useShowcaseCommentsMutation;
