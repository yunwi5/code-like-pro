import { AppProperty } from '../constants/app';
import { ForumCategory } from '../models/enums';
import {
    IForumPostProps,
    IForumPost,
    IComment,
    IForumPostPopulated,
} from '../models/interfaces';
import { deleteRequest, getRequest, patchRequest, postRequest } from './requests.api';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/forumPost`;

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

export async function postForumPostLike(id: string) {
    return await postRequest<IForumPost>({ url: `${API_DOMAIN}/${id}/like`, body: {} });
}
