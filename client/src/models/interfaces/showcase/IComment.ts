import { IVote } from '..';

export interface IComment {
    _id: string;
    text: string;
    user: { _id: string; name: string; pictureUrl: string }; // Author of the comment
    postedAt: string; // ISO date
    replyTo?: string; // Comment _id that this comment replies to.
    votes: IVote[];
}
