import { SubmissionStatus } from '../../models/enums';
import { IExerciseCard, IUserSubmissionPopulated } from '../../models/interfaces';
import { IFilterState } from '../../store/redux/browsing-slice';

// Filter exercises by selected language, difficulty and tags.
export function filterExercises<T>(exercises: IExerciseCard[], filterState: IFilterState) {
    const filtered = exercises.filter((ex) => {
        // Language filter
        if (filterState.language !== 'All' && ex.language !== filterState.language) {
            return false;
        }

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

// Filter exercises by user submission status (result).
type SubmissionMap = { [key: string]: IUserSubmissionPopulated };
export function filterExercisesBySubmissionStatus(
    exercises: IExerciseCard[],
    submissionMap: SubmissionMap,
    submissionStatus: SubmissionStatus | 'All',
) {
    return exercises.filter((ex) => {
        if (submissionStatus === 'All') return true;
        if (submissionMap[ex._id] == null) {
            // Means this exercise was not attempted by the user.
            return submissionStatus === SubmissionStatus.UNATTEMPTED;
        } else {
            // Means this exercise was previosuly attempted by the user.
            if (submissionMap[ex._id].correct)
                // If the submission status is correct
                return submissionStatus === SubmissionStatus.CORRECT;
            // If the submissio status is incorrect
            return submissionStatus === SubmissionStatus.INCORRECT;
        }
    });
}
