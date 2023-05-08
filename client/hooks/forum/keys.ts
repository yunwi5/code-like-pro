import { ForumCategory } from './../../models/enums/forum/ForumCategory';

export const getForumPostsQueryKey = (category?: ForumCategory) =>
  `forum-posts${category ? `-${category}` : ''}`;

export const getForumPostKey = (postId: string) => `foum-post-${postId}`;
