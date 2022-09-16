export function getBrowsingPageLink() {
    return '/browse';
}

export function getExerciseAttemptPageLink(id: string) {
    return `/exercise/${id}`;
}
export function getShowcasePageLink(exerciseId: string) {
    return `/showcase/${exerciseId}`;
}

export function getExerciseEditLink(exerciseId: string) {
    return `/edit-exercise/${exerciseId}`;
}
