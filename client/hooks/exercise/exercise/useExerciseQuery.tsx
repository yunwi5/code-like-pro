import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExerciseById } from '../../../apis/exercise.api';
import { getExerciseKey } from '../keys';

// Custom hook for fetching exercise data with React Query.
function useExerciseQuery(exerciseId: string) {
  // Get QueryClient and construct the query key.
  const queryClient = useQueryClient();
  const exerciseQueryKey = getExerciseKey(exerciseId);

  // Fetch the exercise data
  const {
    data: response,
    error,
    isLoading,
  } = useQuery([exerciseQueryKey], () => getExerciseById(exerciseId));

  const { data: exercise, message } = response || {};

  if (error) console.log(error);

  // Refetch the exercise data for an immediate update on UI.
  const refetchExercise = useCallback(
    () => queryClient.invalidateQueries([exerciseQueryKey]),
    [exerciseQueryKey],
  );

  return { exercise, isLoading, error: message, refetch: refetchExercise };
}

export default useExerciseQuery;
