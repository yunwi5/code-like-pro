import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getExerciseComments } from '../../../apis/exercise.api';
import { getExerciseCommentsKey } from '../keys';

function useExerciseCommentsQuery(exerciseId: string, refetchInterval: number = 1000) {
  const queryClient = useQueryClient();

  // Use React-Query to fetch the comments data of this exercise.
  const commentQueryKey = getExerciseCommentsKey(exerciseId);
  const { data: response, isLoading } = useQuery(
    [commentQueryKey],
    () => getExerciseComments(exerciseId),
    { refetchInterval },
  );

  const { data: comments, message: error } = response || {};
  if (error) console.log(error);

  const refetch = () => queryClient.refetchQueries([commentQueryKey]);

  return { comments, error, isLoading, refetch };
}

export default useExerciseCommentsQuery;
