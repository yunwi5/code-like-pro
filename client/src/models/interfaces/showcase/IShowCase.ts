import { IVote } from '..';

// Showcase unpopulated version
export interface IShowCase {
    _id: string;
    code: string;
    description: string;
    postedAt: string; // ISO date
    user: { _id: string; name: string }; // Author user
    comments: string[]; // list of comment ids (comments are not populated)
    votes: IVote[];
}
