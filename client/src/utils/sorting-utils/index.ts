import { Difficulty } from '../../models/enums';
import { mapDifficultyToNumericValue } from '../difficulty';

export function sortByName(obj1: { name: string }, obj2: { name: string }) {
    return obj1.name.trim().toLowerCase() < obj2.name.trim().toLowerCase() ? -1 : 1;
}

export function sortByDifficulty(
    obj1: { difficulty: Difficulty },
    obj2: { difficulty: Difficulty },
) {
    const obj1DiffValue = mapDifficultyToNumericValue(obj1.difficulty);
    const obj2DiffValue = mapDifficultyToNumericValue(obj2.difficulty);
    return obj1DiffValue - obj2DiffValue;
}
