import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getForumPostById } from '../../../apis/forum.api';
import { getForumPostKey } from '../keys';

function useForumPostQuery(postId: string, refetchInterval?: number) {
  const queryClient = useQueryClient();

  const postQueryKey = getForumPostKey(postId);
  const { data: response, isLoading } = useQuery(
    [postQueryKey],
    () => getForumPostById(postId),
    { refetchInterval },
  );

  const { data: post, message: error } = response || {};
  if (error) console.log(error);

  const refetch = () => queryClient.refetchQueries([postQueryKey]);

  return { post, isLoading, error, refetch };
}

export default useForumPostQuery;
