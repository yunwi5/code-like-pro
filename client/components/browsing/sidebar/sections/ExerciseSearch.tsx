import React, { useState } from 'react';
import { SearchKeyList } from '../../../../models/enums';
import {
  exerciseBrowsingActions,
  ISearchingState,
} from '../../../../store/redux/browsing-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';
import Searchbar from '../../../ui/inputs/Searchbar';

// The functionality needs to be implemented.
const ExerciseSearch: React.FC = () => {
  const { key, text } = useAppSelector((state) => state.browsing.searching);
  const [localSearchingState, setLocalSearchingState] = useState<ISearchingState>({
    key,
    text,
  });

  const dispatch = useAppDispatch();

  const handleSearchText = (newText: string) => {
    setLocalSearchingState((prev) => ({ ...prev, text: newText }));
    // If the text is empty, clear the search and show all exercises
    if (newText.trim() === '')
      dispatch(
        exerciseBrowsingActions.setSearching({
          ...localSearchingState,
          text: '',
        }),
      );
  };

  const handleSearch = () => {
    dispatch(exerciseBrowsingActions.setSearching({ ...localSearchingState }));
  };

  return (
    <Searchbar
      searchKeys={SearchKeyList}
      keyValue={localSearchingState.key}
      onKeyChange={(newKey: string) =>
        setLocalSearchingState((prev) => ({ ...prev, key: newKey as any }))
      }
      textValue={localSearchingState.text}
      onTextChange={handleSearchText}
      onSearch={handleSearch}
    />
  );
};

export default ExerciseSearch;
