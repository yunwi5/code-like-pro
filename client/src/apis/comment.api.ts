import { AppProperty } from '../constants/app';
import { deleteRequest, getRequest, patchRequest, postRequest } from './requests.api';
import { IComment } from '../models/interfaces';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/comment`;

// Patch/edit the comment of the param id
export async function patchComment(commentId: string, commentProp: { text: string }) {
    return await patchRequest<IComment>({
        url: `${API_DOMAIN}/${commentId}`,
        body: commentProp,
    });
}

// Delete the comment of the param id
export async function deleteComment(commentId: string) {
    return await deleteRequest<IComment>({ url: `${API_DOMAIN}/${commentId}` });
}

// Comment related APIs
// Reply comment APIs
export async function getReplyComments(commentId: string) {
    return await getRequest<IComment[]>({ url: `${API_DOMAIN}/${commentId}/reply` });
}

// POST reply comment to to the comment of the param id
export async function postReplyComment(commentId: string, comment: { text: string }) {
    // Returns a newly created reply comment
    return await postRequest<IComment>({
        url: `${API_DOMAIN}/${commentId}/reply`,
        body: comment,
    });
}

// POST comment vote (up or down)
export async function postCommentVote(commentId: string, vote: { type: 'up' | 'down' }) {
    return await postRequest<IComment>({
        url: `${API_DOMAIN}/${commentId}/vote`,
        body: vote,
    });
}

// DELETE comment vote by the current user
export function deleteCommentVote(commentId: string) {
    return deleteRequest<IComment>({ url: `${API_DOMAIN}/${commentId}/vote` });
}
