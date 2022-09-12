import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExerciseSubmissions } from '../../apis/exercise';

// Custom hook for fetching exercise submission data with refetchInterval (1s by default).
function useExerciseSubmissionsQuery(exerciseId: string, refetchInterval: number = 1000) {
    const { data: response, isLoading } = useQuery(
        ['exercise-submission', exerciseId],
        () => getExerciseSubmissions(exerciseId || ''),
        {
            // Refetch exercise submission data every second.
            refetchInterval,
        },
    );
    const { data: submissions, message: error } = response || {};

    if (error) console.log(error);

    return { submissions, error, isLoading };
}

export default useExerciseSubmissionsQuery;
