import { Difficulty } from '../../models/enums';
import { IVote } from '../../models/interfaces';
import { mapDifficultyToNumericValue } from '../difficulty';

export function compareByName(obj1: { name: string }, obj2: { name: string }) {
    return obj1.name.trim().toLowerCase() < obj2.name.trim().toLowerCase() ? -1 : 1;
}

export function compareByDifficulty(
    obj1: { difficulty: Difficulty },
    obj2: { difficulty: Difficulty },
) {
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
