export enum ForumCategory {
  GENERAL = 'general',
  ALGORITHMS = 'algorithms',
  INTERVIEWS = 'interviews',
  TECHNOLOGIES = 'technologies',
  CAREERS = 'careers',
  UNIVERSITY = 'university',
  FEEDBACK = 'feedback',
}

export const ForumCategoryList = Object.freeze(Object.values(ForumCategory));

export const getForumCategory = (category: string) => {
  return ForumCategoryList.find((cat) => cat.toLowerCase() === category.toLowerCase());
};
