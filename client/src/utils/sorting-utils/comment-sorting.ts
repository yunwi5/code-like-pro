import { CommentSortingKey, SortingDirection } from '../../models/enums';
import { IComment } from '../../models/interfaces';
import { compareByDateTime } from '../datetime';

function getCommentUpVoteCount(comment: IComment) {
    return comment.votes.reduce(
        (accCount, curr) => (curr.type === 'up' ? accCount + 1 : accCount),
        0,
    );
}

function compareByVotes(commentA: IComment, commentB: IComment) {
    const aUpVotes = getCommentUpVoteCount(commentA);
    const aVoteMargin = aUpVotes - (commentA.votes.length - aUpVotes);

    const bUpVotes = getCommentUpVoteCount(commentB);
    const bVoteMargin = bUpVotes - (commentB.votes.length - bUpVotes);

    return aVoteMargin - bVoteMargin;
}

export function sortComments(
    comments: IComment[],
    sortingKey: CommentSortingKey,
    direction: SortingDirection,
) {
    if (sortingKey === CommentSortingKey.NONE) return [...comments];

    const isAsc = direction === SortingDirection.ASCENDING;
    switch (sortingKey) {
        case CommentSortingKey.VOTES:
            return comments.sort((a, b) =>
                isAsc ? compareByVotes(a, b) : compareByVotes(b, a),
            );

        case CommentSortingKey.DATETIME:
            return comments.sort((a, b) =>
                isAsc
                    ? compareByDateTime(a.postedAt, b.postedAt)
                    : compareByDateTime(b.postedAt, a.postedAt),
            );
        default:
            return [...comments];
    }
}
