import { options } from './../components/ui/charts/TrendChart';
import { ForumCategory } from '../models/enums';
import {
  IForumPostProps,
  IForumPost,
  IComment,
  IForumPostPopulated,
} from '../models/interfaces';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  ReqOptions,
} from './common-requests';

const API_DOMAIN = '/forumPost';

export function postForumPost(newPost: IForumPostProps) {
  return postRequest<IForumPost>({ url: `${API_DOMAIN}`, body: newPost });
}

export function getForumPosts(options?: ReqOptions) {
  return getRequest<IForumPost[]>({ url: API_DOMAIN, options });
}

export async function getForumPostsData(options?: ReqOptions) {
  return getForumPosts(options).then(({ data }) => data);
}

export function getForumCategoryPosts(category: ForumCategory, options?: ReqOptions) {
  return getRequest<IForumPost[]>({ url: `${API_DOMAIN}/category/${category}`, options });
}

export async function getForumCategoryPostsData(
  category: ForumCategory,
  options?: ReqOptions,
) {
  return getForumCategoryPosts(category, options).then(({ data }) => data);
}

export function getForumPostById(id: string, options?: ReqOptions) {
  return getRequest<IForumPostPopulated>({ url: `${API_DOMAIN}/${id}`, options });
}

export function getForumPostByIdData(id: string, options?: ReqOptions) {
  return getForumPostById(id, options).then(({ data }) => data);
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
