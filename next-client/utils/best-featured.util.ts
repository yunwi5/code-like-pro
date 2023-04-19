import { IVote } from '@/models/interfaces';

import { hasOverallPositiveVotes } from './votes.util';

export interface IVotable {
  _id: string;
  votes: IVote[];
  postedAt: string;
}

type WithScore<T> = T & { score: number };

export type BestFeatured<T> = T & { best: boolean };

function getWilsonScore(upvotes: number, downvotes: number): number {
  const n = upvotes + downvotes;
  if (n === 0) return 0;

  const z = 1.96; // Confidence level: 95%
  const p = upvotes / n;
  const denominator = 1 + (z * z) / n;
  const numerator = p + (z * z) / (2 * n);

  return numerator / denominator;
}

function itemScore<T extends IVotable>(item: T, now: number): number {
  const upvotes = item.votes.filter((vote) => vote.type === 'up').length;
  const downvotes = item.votes.length - upvotes;

  const ratio = getWilsonScore(upvotes, downvotes);
  const ageInSeconds = (now - new Date(item.postedAt).getTime()) / 1000;

  return ratio - upvotes * 1e-6 - ageInSeconds * 1e-9;
}

export function featureBestItems<T extends IVotable>(
  items: T[],
  limit: number = 3,
): BestFeatured<T>[] {
  const validLimit = Math.min(limit, Math.floor(items.length / 3));

  const now = Date.now();
  const scoredItems: WithScore<T>[] = items.map((item) => ({
    ...item,
    score: itemScore(item, now),
  }));

  const bestItemIds = new Set(
    [...scoredItems]
      .sort((a, b) => b.score - a.score)
      .slice(0, validLimit + 1)
      .filter((item) => hasOverallPositiveVotes(item.votes))
      .map((item) => item._id),
  );

  const bestFeaturedItems = scoredItems.map((item) => {
    const best = bestItemIds.has(item._id);
    return { ...item, best };
  });

  return bestFeaturedItems;
}
