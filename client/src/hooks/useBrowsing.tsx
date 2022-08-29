import React, { useEffect, useMemo, useState } from 'react';
import { IExerciseCard } from '../models/interfaces';
import { useAppSelector } from '../store/redux/store';
import { filterExercises } from '../utils/filter-utils/exercise-filter';
import { searchExercises } from '../utils/search-util';
import { sortExercises } from '../utils/sorting-utils/exercise-sorting';

// Get searching, filtering, and sorting information from redux.
// Apply those settings to the exercises list
function useBrowsing(exercises: IExerciseCard[]) {
    const { searching, sorting, filtering } = useAppSelector((state) => state.browsing);

    const [processedExercises, setProcessedExercises] = useState(exercises);

    // Do searching first
    const searchedExercises = useMemo(() => {
        const res = searchExercises(exercises, searching);
        console.log('Search exercises!');
        console.table(res);
        return res;
    }, [exercises, searching]);

    // Do filtering second
    const filteredExercises = useMemo(() => {
        return filterExercises<IExerciseCard>(searchedExercises, filtering);
    }, [searchedExercises, filtering]);

    // Do sorting last as it is the most expensive operation.
    useEffect(() => {
        // Do sorting last.
        const result = sortExercises([...filteredExercises], sorting);
        console.log('Sorting:', sorting);
        console.log('result:', result);
        setProcessedExercises(result);
    }, [filteredExercises, sorting]);

    return { exercises: processedExercises };
}

export default useBrowsing;
