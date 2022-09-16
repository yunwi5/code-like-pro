import { IVote } from '..';

// Showcase unpopulated version
export interface IShowCase {
    _id: string;
    code: string;
    description: string;
    postedAt: string; // ISO date
    user: string; // User id (user is not populated)
    comments: string[]; // list of comment ids (comments are not populated)
    votes: IVote[];
}
