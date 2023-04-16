import { useQuery } from '@tanstack/react-query';
import { getExerciseSubmissions } from '../../../apis/exercise.api';
import { getExerciseSubmissionsKey } from '../keys';

// Custom hook for fetching exercise submission data with refetchInterval (1s by default).
function useExerciseSubmissionsQuery(exerciseId: string, refetchInterval?: number) {
    const submissionsQueryKey = getExerciseSubmissionsKey(exerciseId);
    const { data: response, isLoading } = useQuery(
        [submissionsQueryKey],
        () => getExerciseSubmissions(exerciseId || ''),
        {
            refetchInterval,
            enabled: !!exerciseId,
        },
    );
    const { data: submissions, message: error } = response || {};

    if (error) console.log(error);

    return { submissions, error, isLoading };
}

export default useExerciseSubmissionsQuery;
