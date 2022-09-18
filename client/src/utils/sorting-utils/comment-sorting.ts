import { compareByVotes } from '.';
import { CommentSortingKey, SortingDirection } from '../../models/enums';
import { IComment } from '../../models/interfaces';
import { compareByDateTime } from '../datetime';

export function sortComments(
    comments: IComment[],
    sortingKey: CommentSortingKey,
    direction: SortingDirection,
) {
    const isAsc = direction === SortingDirection.ASCENDING;
    switch (sortingKey) {
        case CommentSortingKey.VOTES:
            return comments.sort((a, b) =>
                isAsc ? compareByVotes(a.votes, b.votes) : compareByVotes(b.votes, a.votes),
            );

        case CommentSortingKey.DATETIME:
            return comments.sort((a, b) =>
                isAsc
                    ? compareByDateTime(a.postedAt, b.postedAt)
                    : compareByDateTime(b.postedAt, a.postedAt),
            );
        default:
            return comments;
    }
}
