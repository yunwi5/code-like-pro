import { useQuery } from '@tanstack/react-query';
import { getExercises } from '../../apis/exercise.api';

function useExerciseListQuery() {
  const { isLoading, data: response } = useQuery(['exercises'], () => getExercises(), {
    refetchOnWindowFocus: true, // refetch whenever the user focuses on the window.
  });

  const { data: exercises, message: error } = response || {};

  if (error) console.log(error);

  return { isLoading, exercises: exercises || [], error };
}

export default useExerciseListQuery;
