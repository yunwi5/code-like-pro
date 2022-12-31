import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExerciseReports } from '../../apis/exercise.api';

function useExerciseReportsQuery(
    exerciseId: string | undefined,
    refetchInterval: number = 1000,
) {
    const queryClient = useQueryClient();

    // Use React-Query to fetch the comments data of this exercise.
    const reportsQueryKey = `exercise-${exerciseId}-reports`;
    const { data: response, isLoading } = useQuery(
        [reportsQueryKey],
        () => getExerciseReports(exerciseId || ''),
        { refetchInterval, enabled: !!exerciseId },
    );

    const { data: reports, message: error } = response || {};
    if (error) console.log(error);

    const refetch = () => queryClient.refetchQueries([reportsQueryKey]);

    return { reports: reports || [], error, isLoading, refetch };
}

export default useExerciseReportsQuery;
