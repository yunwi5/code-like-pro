import { ForumCategory, ForumPostType } from '../../enums';
import { IComment } from '../showcase/IComment';
import { IVote } from '../showcase/IVote';

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
  comments: string[] | IComment[]; // type does not matter here
  votes: IVote[];
}

// Comment populated
export interface IForumPostPopulated extends IForumPost {
  comments: IComment[];
}
