import React from 'react';
import { IoMdCreate } from 'react-icons/io';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import {
  ForumPostSortingKey,
  SearchKey,
  SearchKeyList,
  SortingDirection,
} from '../../../../models/enums';
import { forumActions } from '../../../../store/redux/forum-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';
import { getForumPostCreateLink } from '../../../../utils/links.util';
import Button from '../../../ui/buttons/Button';
import Searchbar from '../../../ui/inputs/Searchbar';

// Sidebar component for setting searching and sorting states globally.
const ForumPostsControl: React.FC = () => {
  const router = useRouter();
  const forumCategory = useParams().category;
  const { sorting, searching } = useAppSelector((state) => state.forum);
  const dispatch = useAppDispatch();

  // set sorting state for descending order, either by datetime or likes
  const handleSortingDesc = (key: ForumPostSortingKey) => {
    dispatch(
      forumActions.setSorting({
        key,
        direction: SortingDirection.DESCENDING,
      }),
    );
  };
  const handleSearchAction = (searchKey: string, text: string) => {
    dispatch(
      forumActions.setSearching({
        key: searchKey as SearchKey,
        text,
      }),
    );
  };

  const isSortedByNewest =
    sorting.key === ForumPostSortingKey.DATETIME &&
    sorting.direction === SortingDirection.DESCENDING;

  const isSortedByLikes =
    sorting.key === ForumPostSortingKey.LIKES && sorting.direction === SortingDirection.DESCENDING;

  return (
    <div className="flex flex-col gap-3 px-2 py-2 pb-4 border-b-2 border-gray-300">
      <div className="flex justify-between gap-3">
        <button
          onClick={handleSortingDesc.bind(null, ForumPostSortingKey.DATETIME)}
          className={`${isSortedByNewest ? 'text-main-500' : ''} hover:text-main-400`}
        >
          Newest
        </button>
        <button
          onClick={handleSortingDesc.bind(null, ForumPostSortingKey.LIKES)}
          className={`${isSortedByLikes ? 'text-main-500' : ''} hover:text-main-400`}
        >
          Most Likes
        </button>
        <Button
          onClick={() => router.push(getForumPostCreateLink(forumCategory as any))}
          mode="empty"
          className="ml-auto !border-transparent !shadow-none flex-center gap-1"
          size="small"
        >
          <IoMdCreate /> New Post
        </Button>
      </div>
      <Searchbar
        defaultSearchKey={searching.key}
        searchKeys={SearchKeyList}
        onSearch={handleSearchAction}
      />
    </div>
  );
};

export default ForumPostsControl;
