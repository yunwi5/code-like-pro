import { compareByDateTime, compareByName, compareByVotes } from '.';
import { ForumPostSortingKey, SortingDirection } from '../../models/enums';
import { IForumPost } from '../../models/interfaces';
import { IForumSortingState } from '../../store/redux/forum-slice';

// Sort forums based on forum post sorting key and sorting direction
export function sortForumPosts(posts: IForumPost[], sortingState: IForumSortingState) {
  if (sortingState.key === ForumPostSortingKey.NONE) return posts;

  const isAsc = sortingState.direction === SortingDirection.ASCENDING;
  // Sort by post tile alphabtically
  if (sortingState.key === ForumPostSortingKey.TITLE) {
    return posts.sort((a, b) => (isAsc ? compareByName(a, b) : compareByName(b, a)));
  }

  // Sort by favorite/like counts by users
  if (sortingState.key === ForumPostSortingKey.LIKES) {
    return posts.sort((a, b) =>
      isAsc ? compareByVotes(a.votes, b.votes) : compareByVotes(b.votes, a.votes),
    );
  }

  // Sort by post creation datetime
  if (sortingState.key === ForumPostSortingKey.DATETIME) {
    return posts.sort((a, b) =>
      isAsc
        ? compareByDateTime(a.createdAt, b.createdAt)
        : compareByDateTime(b.createdAt, a.createdAt),
    );
  }

  return posts;
}
