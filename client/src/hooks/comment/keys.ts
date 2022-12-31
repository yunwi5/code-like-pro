export const getExerciseCommentsKey = (exerciseId: string) =>
    `exercise-${exerciseId}-comment`;

export const getReplyCommentsKey = (commentId: string) => `comment-${commentId}`;