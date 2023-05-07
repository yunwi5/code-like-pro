import { useQuery } from '@tanstack/react-query';

import { getTopExercises } from '../../apis/exercise.api';

// Fetch the full list of exercises from the server
function useExerciseTopQuery(amount: number = 3) {
  const { isLoading, data: response } = useQuery(
    ['top-exercises', amount],
    () => getTopExercises(amount),
    {
      refetchOnWindowFocus: true, // refetch whenever the user focuses on the window.
    },
  );

  const { data: exercises, message: error } = response || {};

  if (error) console.log(error);

  return { isLoading, exercises: exercises || [], error };
}

export default useExerciseTopQuery;
