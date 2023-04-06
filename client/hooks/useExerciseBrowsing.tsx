import { useEffect, useMemo, useState } from 'react';
import { IExerciseCard } from '../models/interfaces';
import { useUserContext } from '../store/context/UserContext';
import { useAppSelector } from '../store/redux/store';
import {
    filterExercises,
    filterExercisesBySubmissionStatus,
} from '../utils/filter-utils/exercise.filter';
import { searchExercises } from '../utils/search';
import { sortExercises } from '../utils/sorting-utils/exercise.sorting';

// Get searching, filtering, and sorting information from redux.
// Apply those settings to the exercises list
function useBrowsing(exercises: IExerciseCard[]) {
    const { submissionMap } = useUserContext(); // To access the user submission results of the exercises.
    const { searching, sorting, filtering } = useAppSelector((state) => state.browsing);

    // Searched, filtered and sorted exercises.
    const [processedExercises, setProcessedExercises] = useState(exercises);

    // Do searching first
    const searchedExercises = useMemo(() => {
        return searchExercises(exercises, searching);
    }, [exercises, searching]);

    // Do filtering second
    const filteredExercises = useMemo(() => {
        // Filter exercises by selected language, difficulty and tags.
        let filtered = filterExercises(searchedExercises, filtering);
        // Filter exercises further by user submission status (result).
        return filterExercisesBySubmissionStatus(
            filtered,
            submissionMap,
            filtering.submissionStatus,
        );
    }, [searchedExercises, filtering]);

    // Do sorting last as it is the most expensive operation.
    useEffect(() => {
        // Do sorting last.
        const result = sortExercises([...filteredExercises], sorting);
        setProcessedExercises(result);
    }, [filteredExercises, sorting]);

    return { exercises: processedExercises };
}

export default useBrowsing;
