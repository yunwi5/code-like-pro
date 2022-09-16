import { SearchKey } from '../models/enums';
import { IExerciseCard } from '../models/interfaces';
import { ISearchingState } from '../store/redux/browsing-slice';

export function searchIncludes(searched: string, inputString: string) {
    return searched.toLowerCase().includes(inputString.trim().toLowerCase());
}

export function searchExercises(exercises: IExerciseCard[], searchState: ISearchingState) {
    // Search by exercise name case-insensitive
    if (searchState.key === SearchKey.TITLE) {
        return exercises.filter((ex) => searchIncludes(ex.name, searchState.text));
    }

    // Search by author name case-insensitive
    if (searchState.key === SearchKey.AUTHOR) {
        return exercises.filter((ex) =>
            searchIncludes(ex?.author?.name || '', searchState.text),
        );
    }

    if (searchState.key === SearchKey.PROMPT) {
        return exercises.filter((ex) => searchIncludes(ex?.prompt || '', searchState.text));
    }

    return exercises;
}
