export enum CommentSortingKey {
  NONE = "None",
  DATETIME = "Date & time", // Sorting by datetime of the comment post.
  VOTES = "Votes", // Sorting by upvotes - downvotes value
}

export const CommentSortingKeyList = Object.freeze(
  Object.values(CommentSortingKey)
);
