export enum VotingItemSortingKey {
  NONE = 'None',
  DATETIME = 'Date & time', // Sorting by datetime of the comment post.
  VOTES = 'Votes', // Sorting by upvotes - downvotes value
}

export const VotingItemSortingKeyList = Object.freeze(Object.values(VotingItemSortingKey));
