import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getExerciseShowcases } from '../../../apis/exercise.api';
import { getExerciseShowcasesKey } from '../keys';

function useExerciseShowcaseQuery(exerciseId: string, refetchInterval: number = 1000) {
  const queryClient = useQueryClient();

  // Use React-Query to fetch the showcase data of this exercise.
  const showcaseQueryKey = getExerciseShowcasesKey(exerciseId);
  const { data: response, isLoading } = useQuery(
    [showcaseQueryKey],
    () => getExerciseShowcases(exerciseId),
    { refetchInterval },
  );

  const { data: showcases, message: error } = response || {};
  if (error) console.log(error);

  const refetch = () => queryClient.refetchQueries([showcaseQueryKey]);

  return { showcases: showcases, error, isLoading, refetch };
}

export default useExerciseShowcaseQuery;
