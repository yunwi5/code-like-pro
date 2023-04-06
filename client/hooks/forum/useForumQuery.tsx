import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getForumPosts } from '../../apis/forum.api';

// Get all posts across all forum categories
function useForumQuery(refetchInterval?: number) {
    const queryClient = useQueryClient();

    const postQueryKey = `foum-posts`;
    const { data: response, isLoading } = useQuery(
        [postQueryKey],
        () => getForumPosts(),
        { refetchInterval, refetchOnWindowFocus: true },
    );

    const { data: posts, message: error } = response || {};
    if (error) console.log(error);

    const refetch = () => queryClient.refetchQueries([postQueryKey]);

    return { posts, isLoading, error, refetch };
}

export default useForumQuery;
