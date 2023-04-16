'use client';
import React, { useState } from 'react';
import { IoMdCreate } from 'react-icons/io';
import Link from 'next/link';

import {
  ForumPostSortingKey,
  SearchKey,
  SearchKeyList,
  SortingDirection,
} from '../../../../models/enums';
import { forumActions, IForumSearchState } from '../../../../store/redux/forum-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';
import { getForumPostCreateLink } from '../../../../utils/links.util';
import Searchbar from '../../../ui/inputs/Searchbar';

const GlobalForumPostsControl: React.FC = () => {
  const { sorting, searching } = useAppSelector((state) => state.forum);
  const dispatch = useAppDispatch();
  // Search state managed locally, before submitting
  const [searchState, setSearchState] = useState<IForumSearchState>(searching);

  // set sorting state for descending order, either by datetime or likes
  const handleSorting = (
    key: ForumPostSortingKey,
    direction: SortingDirection = SortingDirection.DESCENDING,
  ) => {
    dispatch(
      forumActions.setSorting({
        key,
        direction,
      }),
    );
  };

  const handleSearchKey = (key: string) => {
    if (SearchKeyList.includes(key as any))
      setSearchState((prev) => ({ ...prev, key: key as SearchKey }));
  };

  const handleSearchText = (text: string) => {
    setSearchState((prev) => ({ ...prev, text }));
  };

  const handleSearchAction = () => {
    dispatch(forumActions.setSearching({ ...searchState }));
  };

  const isSortedByTitleAsc =
    sorting.key === ForumPostSortingKey.TITLE && sorting.direction === SortingDirection.ASCENDING;
  const isSortedByTitleDesc =
    sorting.key === ForumPostSortingKey.TITLE && sorting.direction === SortingDirection.DESCENDING;
  const isSortedByNewest = sorting.key === ForumPostSortingKey.DATETIME;
  const isSortedByLikes = sorting.key === ForumPostSortingKey.LIKES;

  return (
    <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-y-3">
      <div className="self-stretch flex gap-3">
        <button
          onClick={() => handleSorting(ForumPostSortingKey.TITLE, SortingDirection.ASCENDING)}
          className={`${isSortedByTitleAsc ? 'text-main-500' : ''} hover:text-main-400`}
        >
          Title A-Z
        </button>
        <button
          onClick={() => handleSorting(ForumPostSortingKey.TITLE, SortingDirection.DESCENDING)}
          className={`hidden lg:inline-block ${
            isSortedByTitleDesc ? 'text-main-500' : ''
          } hover:text-main-400`}
        >
          Title Z-A
        </button>
        <button
          onClick={() => handleSorting(ForumPostSortingKey.DATETIME)}
          className={`${isSortedByNewest ? 'text-main-500' : ''} hover:text-main-400`}
        >
          Newest
        </button>
        <button
          onClick={() => handleSorting(ForumPostSortingKey.LIKES)}
          className={`${isSortedByLikes ? 'text-main-500' : ''} hover:text-main-400`}
        >
          Most Likes
        </button>
        <NewPostButton className="flex sm:hidden !min-h-[2rem]" />
      </div>
      <div className="self-stretch flex flex-wrap items-center gap-2">
        <Searchbar
          onKeyChange={handleSearchKey}
          keyValue={searchState.key}
          onTextChange={handleSearchText}
          textValue={searchState.text}
          searchKeys={SearchKeyList}
          onSearch={handleSearchAction}
          className={'flex-1'}
        />
        <NewPostButton className="hidden sm:flex" />
      </div>
    </section>
  );
};

const NewPostButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Link
    href={getForumPostCreateLink()}
    className={`btn btn-small btn-fill sm:min-h-[2.65rem] ml-auto flex-center gap-1 ${className}`}
  >
    <IoMdCreate className="text-[1.5em] sm:text-[1.2em]" />
    <span className="hidden sm:inline">New Post</span>
  </Link>
);

export default GlobalForumPostsControl;
