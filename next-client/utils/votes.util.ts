import { IVote } from '../models/interfaces';

export function getVoteCounts(votes: IVote[]) {
  const upVoteCount = votes.reduce(
    (accCount, curr) => (curr.type === 'up' ? accCount + 1 : accCount),
    0,
  );
  const downVoteCount = votes.length - upVoteCount;
  return { upVoteCount, downVoteCount };
}
