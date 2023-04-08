import React, { useMemo, useState } from 'react';
import { SearchKey } from '../models/enums';
import { IExerciseCard } from '../models/interfaces';
import { ISearchingState } from '../store/redux/browsing-slice';
import { searchExercises } from '../utils/search.util';

function useExerciseSearch(exerciseCards: IExerciseCard[]) {
  const [searchState, setSearchState] = useState<ISearchingState>({
    key: SearchKey.TITLE,
    text: '',
  });

  const setSearchKey = (newKey: SearchKey) => {
    setSearchState((prev) => ({ ...prev, key: newKey }));
  };

  const setSearchText = (newText: string) => {
    setSearchState((prev) => ({ ...prev, text: newText }));
  };

  const searchedExercises = useMemo(() => {
    return searchExercises(exerciseCards, searchState);
  }, [exerciseCards, searchState]);

  return { searchState, exercises: searchedExercises, setSearchKey, setSearchText };
}

export default useExerciseSearch;
