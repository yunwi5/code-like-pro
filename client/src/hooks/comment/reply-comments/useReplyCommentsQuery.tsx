import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getReplyComments } from '../../../apis/comment.api';
import { getReplyCommentsKey } from '../keys';

function useReplyCommentsQuery(commentId: string, refetchInterval: number = 1000) {
    const queryClient = useQueryClient();

    // Fetch reply (sub) comments.
    const commentQueryKey = getReplyCommentsKey(commentId);
    const { data, isLoading, error } = useQuery(
        [commentQueryKey],
        () => getReplyComments(commentId).then((res) => res.data),
        { refetchInterval },
    );
    if (error) console.log(error);

    const replyComments = data || [];

    const refetch = () => queryClient.refetchQueries([commentQueryKey]);

    return { replyComments, isLoading, refetch };
}

export default useReplyCommentsQuery;
