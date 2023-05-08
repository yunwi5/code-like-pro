import { SearchKey } from '../models/enums';
import { IExerciseCard, IForumPost } from '../models/interfaces';
import { ISearchingState } from '../store/redux/browsing-slice';

export function searchIncludes(searched: string, inputString: string) {
  return searched.toLowerCase().includes(inputString.trim().toLowerCase());
}

function searchArrayByName<T extends { name: string }>(array: T[], text: string) {
  return array.filter((ex) => searchIncludes(ex.name, text));
}

function searchArrayByAuthor<T extends { author?: { name: string } }>(array: T[], text: string) {
  return array.filter((ex) => searchIncludes(ex.author?.name || '', text));
}

export function searchExercises(exercises: IExerciseCard[], searchState: ISearchingState) {
  // Search by exercise name case-insensitive
  if (searchState.key === SearchKey.TITLE) {
    return searchArrayByName<IExerciseCard>(exercises, searchState.text);
  }

  // Search by author name case-insensitive
  if (searchState.key === SearchKey.AUTHOR) {
    return searchArrayByAuthor<IExerciseCard>(exercises, searchState.text);
  }

  if (searchState.key === SearchKey.PROMPT) {
    return exercises.filter((ex) => searchIncludes(ex?.prompt || '', searchState.text));
  }

  return exercises;
}

export function searchForumPosts(posts: IForumPost[], searchState: ISearchingState) {
  // Search by exercise name case-insensitive
  if (searchState.key === SearchKey.TITLE) {
    return searchArrayByName<IForumPost>(posts, searchState.text);
  }

  // Search by author name case-insensitive
  if (searchState.key === SearchKey.AUTHOR) {
    return searchArrayByAuthor<IForumPost>(posts, searchState.text);
  }

  if (searchState.key === SearchKey.PROMPT) {
    return posts.filter((ex) => searchIncludes(ex?.content || '', searchState.text));
  }

  return posts;
}
