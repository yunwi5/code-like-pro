import { ForumCategory } from '../models/enums';
import {
  IForumPostProps,
  IForumPost,
  IComment,
  IForumPostPopulated,
  IVote,
} from '../models/interfaces';
import { deleteRequest, getRequest, patchRequest, postRequest } from './common-requests';

const API_DOMAIN = '/forumPost';

export function postForumPost(newPost: IForumPostProps) {
  return postRequest<IForumPost>({ url: `${API_DOMAIN}`, body: newPost });
}

export function getForumPosts() {
  return getRequest<IForumPost[]>({ url: API_DOMAIN });
}

export function getForumPostsForCategory(category: ForumCategory) {
  return getRequest<IForumPost[]>({ url: `${API_DOMAIN}/category/${category}` });
}

export function getForumPostById(id: string) {
  return getRequest<IForumPostPopulated>({ url: `${API_DOMAIN}/${id}` });
}

export function patchForumPost(id: string, postProps: IForumPostProps) {
  return patchRequest<IForumPost>({ url: `${API_DOMAIN}/${id}`, body: postProps });
}

export function deleteForumPost(id: string) {
  return deleteRequest<IForumPost>({ url: `${API_DOMAIN}/${id}` });
}

export async function postForumPostComment(id: string, comment: { text: string }) {
  return await postRequest<IComment>({
    url: `${API_DOMAIN}/${id}/comment`,
    body: comment,
  });
}

// POST vote for forum post
export async function postForumPostVote(id: string, vote: { type: 'up' | 'down' }) {
  return await postRequest<IForumPost>({
    url: `${API_DOMAIN}/${id}/vote`,
    body: vote,
  });
}

// DELETE vote for forum post
export function deleteForumPostVote(postId: string) {
  return deleteRequest<IForumPost>({
    url: `${API_DOMAIN}/${postId}/vote`,
  });
}
