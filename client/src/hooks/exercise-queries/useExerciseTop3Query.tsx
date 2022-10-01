import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTop3Exercises } from '../../apis/exercise.api';

// Fetch the full list of exercises from the server
function useExerciseTop3Query() {
    const { isLoading, data: response } = useQuery(
        ['exercises'],
        () => getTop3Exercises(),
        {
            refetchOnWindowFocus: true, // refetch whenever the user focuses on the window.
        },
    );

    const { data: exercises, message: error } = response || {};

    if (error) console.log(error);

    return { isLoading, exercises: exercises || [], error };
}

export default useExerciseTop3Query;
