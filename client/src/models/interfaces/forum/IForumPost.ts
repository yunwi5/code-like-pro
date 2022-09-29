import { ForumCategory, ForumPostType } from '../../enums';
import { IComment } from '../showcase/IComment';

// Forum post creation form props.
// Minimum requirements for post creation. Does not have comments and likes.
export interface IForumPostProps {
    _id?: string;
    name: string;
    postType: ForumPostType;
    category: ForumCategory;
    content: string;
    tags: string[];
}

// Forum post created object sent from the server.
export interface IForumPost extends IForumPostProps {
    _id: string;
    createdAt: string; // ISO
    author: { _id: string; name: string; pictureUrl: string };
    comments: string[];
    liked: string[]; // list of user ids who liked this post
}

// Comment populated
export interface IForumPostPopulated extends IForumPostProps {
    _id: string;
    createdAt: string; // ISO
    author: { _id: string; name: string; pictureUrl: string };
    comments: IComment[];
    liked: string[]; // list of user ids who liked this post
}
