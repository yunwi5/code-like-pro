import {
  ForumCategory,
  ForumCategoryList,
  ProfileSection,
  ProgrammingTopic,
  ShowCaseSection,
} from '../models/enums';
import { IForumPost, IForumPostPopulated } from '../models/interfaces';

import { slugify } from './string-utils/url.util';
import { ProfileLinkMap } from './profile.util';

export function getRegisterLink() {
  return '/register';
}

export function getLoginLink() {
  return '/login';
}

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
  return `/profile/${ProfileLinkMap[profileSection]}`;
}

// Could add initial shwocase section as a query string
export function getShowcasePageLink(
  exerciseId: string,
  section: ShowCaseSection = ShowCaseSection.MODEL_ANSWER,
) {
  const sectionQueryString = slugify(section);
  return `/showcase/${exerciseId}/${sectionQueryString}`;
}

export function getShowcaseInvitesPageLink() {
  return `/showcase-invites`;
}

export function getForumLink() {
  return '/forum';
}

export function getForumCategoryLink(section: ForumCategory) {
  return `/forum/category/${section}`;
}

export function getForumPostLink(post: IForumPost | IForumPostPopulated) {
  return `/forum/category/${post.category}/${post._id}`;
}

// Link to creating new forum post. Can set default category through a query string.
export function getForumPostCreateLink(defaultCategory?: ForumCategory) {
  if (ForumCategoryList.includes(defaultCategory as any)) {
    return `/forum/create-post?default-category=${defaultCategory}`;
  }
  return '/forum/create-post';
}

export function getForumPostEditLink(postId: string) {
  return `/forum/edit-post/${postId}`;
}

// Ranking links
export function getGlobalRankigLink() {
  return '/ranking';
}
export function getTopicRankingLink(topic: ProgrammingTopic) {
  const topicSlug = slugify(topic);
  return `/ranking/topic/${topicSlug}`;
}
