export enum SortingKey {
    NAME = 'Name',
    CORRECT_RATE = 'Correct Rate',
    DIFFICULTY = 'Difficulty',
    LIKES = 'Likes',
    ISSUE_REPORTS = 'Issue Reports',
}

export const SortingKeyList = Object.freeze(Object.values(SortingKey));
