export enum ForumPostSortingKey {
  NONE = 'None',
  TITLE = 'Title',
  LIKES = 'Likes',
  DATETIME = 'Date & Time',
}

export const ForumPostSortingKeyList = Object.freeze(Object.values(ForumPostSortingKey));
