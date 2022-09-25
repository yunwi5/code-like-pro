import { ForumCategory, ShowCaseSection } from '../models/enums';
import { IForumPost } from '../models/interfaces';
import { convertToQueryString } from './string-utils/query';

export function getBrowsingPageLink() {
    return '/browse';
}

export function getExerciseAttemptPageLink(id: string) {
    return `/exercise/${id}`;
}

export function getExerciseCreationPageLink() {
    return '/create-exercise';
}

export function getExerciseEditLink(exerciseId: string) {
    return `/edit-exercise/${exerciseId}`;
}

// Could add initial shwocase section as a query string
export function getShowcasePageLink(
    exerciseId: string,
    section: ShowCaseSection = ShowCaseSection.MODEL_ANSWER,
) {
    // If the initial section is 'Showcase' or 'Discussions' users will direclty see that section
    // without having to go through the model answer.
    const sectionQueryString = convertToQueryString(section);
    return `/showcase/${exerciseId}?section=${sectionQueryString}`;
}

export function getShowcaseInvitesPageLink() {
    return `/showcase-invites`;
}

// Global forum links
export function getForumNavSectionLink(section: ForumCategory) {
    return `/forum/${section}`;
}

export function getForumPostLink(post: IForumPost) {
    return `/forum/${post.category}/${post._id}`;
}

export function getForumPostCreateLink() {
    return '/create-post';
}

export function getForumPostEditLink(postId: string) {
    return `/edit-post/${postId}`;
}
