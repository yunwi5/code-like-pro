import { Language } from '../../models/enums';
import { IExerciseCard } from '../../models/interfaces';
import { IFilterState } from '../../store/redux/browsing-slice';

export function filterExercises<T>(exercises: IExerciseCard[], filterState: IFilterState) {
    const filtered = exercises.filter((ex) => {
        // Language filter
        if (filterState.language !== 'All' && ex.language !== filterState.language) {
            return false;
        }

        // difficulty filter, submissionStatus not yet implemented.
        // if ((filterState.submissionStatus !== 'All') && ex.submissionStatus !== filterState.submissionStatus)

        // Difficulties filter
        if (filterState.difficulties.length > 0) {
            if (!filterState.difficulties.includes(ex.difficulty)) return false;
        }

        // Tags filter
        if (filterState.tags.length > 0) {
            let matchCount = 0;
            ex.tags.forEach((tag) => {
                if (filterState.tags.includes(tag)) matchCount++;
            });

            if (matchCount === 0) return false;
        }

        // If passed all the filters, return true.
        return true;
    });
    return filtered as T[];
}
