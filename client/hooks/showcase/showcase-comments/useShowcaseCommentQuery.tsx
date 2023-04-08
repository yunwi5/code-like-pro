import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getShowcaseComments } from '../../../apis/exercise.api';
import { getShowcaseCommentsKey } from '../keys';

function useShowcaseCommentQuery(showcaseId: string, refetchInterval: number = 1000) {
  const queryClient = useQueryClient();

  // Use React-Query to fetch the comment data of this showcase.
  const showcaseQueryKey = getShowcaseCommentsKey(showcaseId);
  const { data: response, isLoading } = useQuery(
    [showcaseQueryKey],
    () => getShowcaseComments(showcaseId),
    { refetchInterval },
  );

  const { data: showcaseComments, message: error } = response || {};
  if (error) console.log(error);

  const refetch = () => queryClient.refetchQueries([showcaseQueryKey]);

  return {
    showcaseComments: showcaseComments || [],
    error,
    isLoading,
    refetch,
  };
}

export default useShowcaseCommentQuery;
