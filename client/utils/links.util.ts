import {
  ForumCategory,
  ForumCategoryList,
  ProfileSection,
  ProgrammingTopic,
  ShowCaseSection,
} from '../models/enums';
import { IForumPost, IForumPostPopulated } from '../models/interfaces';
import { ProfileLinkMap } from './profile.util';
import { convertToUrlString } from './string-utils/url.util';

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

export function getProfileLink(profileSection: ProfileSection) {
  if (!profileSection) return '/profile';
  return `/profile/${ProfileLinkMap[profileSection]}`;
}

// Could add initial shwocase section as a query string
export function getShowcasePageLink(
  exerciseId: string,
  section: ShowCaseSection = ShowCaseSection.MODEL_ANSWER,
) {
  // If the initial section is 'Showcase' or 'Discussions' users will direclty see that section
  // without having to go through the model answer.
  const sectionQueryString = convertToUrlString(section);
  return `/showcase/${exerciseId}?section=${sectionQueryString}`;
}

export function getShowcaseInvitesPageLink() {
  return `/showcase-invites`;
}

export function getForumLink() {
  return '/forum';
}

export function getForumCategoryLink(section: ForumCategory) {
  return `/forum/${section}`;
}

export function getForumPostLink(post: IForumPost | IForumPostPopulated) {
  return `/forum/${post.category}/${post._id}`;
}

// Link to creating new forum post. Can set default category through a query string.
export function getForumPostCreateLink(defaultCategory?: ForumCategory) {
  if (ForumCategoryList.includes(defaultCategory as any)) {
    return `/create-post?default-category=${defaultCategory}`;
  }
  return '/create-post';
}

export function getForumPostEditLink(postId: string) {
  return `/edit-post/${postId}`;
}

// Ranking links
export function getGlobalRankigLink() {
  return '/ranking';
}
export function getTopicRankingLink(topic: ProgrammingTopic) {
  const topicUrlString = convertToUrlString(topic);
  return `/ranking/topic/${topicUrlString}`;
}
