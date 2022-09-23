import { compareByVotes } from '.';
import { VotingItemSortingKey, SortingDirection } from '../../models/enums';
import { IVote } from '../../models/interfaces';
import { compareByDateTime } from '../datetime';

interface IVotingItem {
    votes: IVote[];
    postedAt: string; // ISO date
}

export function sortVotingItems(
    comments: IVotingItem[],
    sortingKey: VotingItemSortingKey,
    direction: SortingDirection,
) {
    const isAsc = direction === SortingDirection.ASCENDING;
    switch (sortingKey) {
        case VotingItemSortingKey.VOTES:
            return comments.sort((a, b) =>
                isAsc ? compareByVotes(a.votes, b.votes) : compareByVotes(b.votes, a.votes),
            );

        case VotingItemSortingKey.DATETIME:
            return comments.sort((a, b) =>
                isAsc
                    ? compareByDateTime(a.postedAt, b.postedAt)
                    : compareByDateTime(b.postedAt, a.postedAt),
            );
        default:
            return comments;
    }
}
