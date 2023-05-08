import { DateTime } from 'luxon';
import { Difficulty } from '../../models/enums';
import { IVote } from '../../models/interfaces';
import { mapDifficultyToNumericValue } from '../difficulty.util';

export function compareByName<T extends { name: string }>(obj1: T, obj2: T) {
  return obj1.name.trim().toLowerCase() < obj2.name.trim().toLowerCase() ? -1 : 1;
}

export function compareByDifficulty<T extends { difficulty: Difficulty }>(obj1: T, obj2: T) {
  const obj1DiffValue = mapDifficultyToNumericValue(obj1.difficulty);
  const obj2DiffValue = mapDifficultyToNumericValue(obj2.difficulty);
  return obj1DiffValue - obj2DiffValue;
}

function getUpVotesCount(votes: IVote[]) {
  return votes.reduce((accCount, curr) => (curr.type === 'up' ? accCount + 1 : accCount), 0);
}

export function compareByVotes(votesA: IVote[], votesB: IVote[]) {
  const upvotesA = getUpVotesCount(votesA);
  const voteMarginA = upvotesA - (votesA.length - upvotesA);

  const upvotesB = getUpVotesCount(votesB);
  const voteMarginB = upvotesB - (votesB.length - upvotesB);

  return voteMarginA - voteMarginB;
}

// Used for sorting by datetime. Both params should be a valid ISO date format.
export function compareByDateTime(isoDateA: string, isoDateB: string) {
  const dateTimeA = DateTime.fromISO(isoDateA);
  const dateTimeB = DateTime.fromISO(isoDateB);

  return dateTimeA < dateTimeB ? -1 : 1;
}
