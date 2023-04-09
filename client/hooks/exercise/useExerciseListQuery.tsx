import { IExerciseWithId } from '@/models/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getExercisesData } from '../../apis/exercise.api';

function useExerciseListQuery(initialData?: IExerciseWithId[]) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['exercises'],
    queryFn: () => getExercisesData(),
    initialData: initialData,
    refetchOnWindowFocus: true,
  });

  if (error) console.log(error);

  return { isLoading, exercises: data || [], error };
}

export default useExerciseListQuery;
