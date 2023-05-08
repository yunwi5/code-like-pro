import { IUser, IVote } from '..';

export interface IComment {
  _id: string;
  text: string;
  user: IUser;
  postedAt: string; // ISO date
  replyTo?: string; // Comment _id that this comment replies to.
  votes: IVote[];
}
