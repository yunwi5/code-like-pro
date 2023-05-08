import React from 'react';

import { SearchKey, SearchKeyList } from '../../../../models/enums';
import { exerciseBrowsingActions } from '../../../../store/redux/browsing-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';
import Searchbar from '../../../ui/inputs/Searchbar';

const ExerciseSearch: React.FC = () => {
  const { key } = useAppSelector((state) => state.browsing.searching);
  const dispatch = useAppDispatch();

  const handleSearch = (searchKey: string, text: string) => {
    dispatch(
      exerciseBrowsingActions.setSearching({
        key: searchKey as SearchKey,
        text,
      }),
    );
  };

  return <Searchbar defaultSearchKey={key} searchKeys={SearchKeyList} onSearch={handleSearch} />;
};

export default ExerciseSearch;
