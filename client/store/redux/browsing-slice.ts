import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Difficulty,
  ExerciseSortingKey,
  Language,
  SearchKey,
  SortingDirection,
  SubmissionStatus,
} from '../../models/enums';

export interface ISearchingState {
  key: SearchKey;
  text: string;
}

export interface ISortingState {
  key: ExerciseSortingKey;
  direction: SortingDirection;
}

export interface IFilterState {
  language: Language | 'All';
  submissionStatus: SubmissionStatus | 'All';
  difficulties: Difficulty[];
  tags: string[];
}

export interface IExerciseBrowsingState {
  searching: ISearchingState;
  sorting: ISortingState;
  filtering: IFilterState;
}

const initialState: IExerciseBrowsingState = {
  searching: { key: SearchKey.TITLE, text: '' },
  sorting: { key: ExerciseSortingKey.NONE, direction: SortingDirection.ASCENDING },
  filtering: { language: 'All', submissionStatus: 'All', difficulties: [], tags: [] },
};

const exerciseBrowsingSlice = createSlice({
  name: 'exercise-browsing',
  initialState,
  reducers: {
    setSorting(state, action: PayloadAction<ISortingState>) {
      state.sorting = action.payload;
    },
    setSearching(state, action: PayloadAction<ISearchingState>) {
      state.searching = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language | 'All'>) {
      state.filtering.language = action.payload;
    },
    setSubmissionStatus(state, action: PayloadAction<SubmissionStatus>) {
      state.filtering.submissionStatus = action.payload;
    },
    // add the input difficulty to the filtering list if it does not exist, remove it otherwise.
    toggleDifficulties(state, action: PayloadAction<Difficulty>) {
      const dif = action.payload;
      const index = state.filtering.difficulties.findIndex((d) => d === dif);
      if (index >= 0) {
        state.filtering.difficulties.splice(index, 1);
      } else {
        state.filtering.difficulties.push(dif);
      }
    },
    // add the input tag to the tags filtering list if it does not exist, remove it otherwise.
    toggleTags(state, action: PayloadAction<string>) {
      const tag = action.payload;
      const index = state.filtering.tags.findIndex((t) => t === tag);
      if (index >= 0) {
        state.filtering.tags.splice(index, 1);
      } else {
        state.filtering.tags.push(tag);
      }
    },
  },
});

export const exerciseBrowsingActions = exerciseBrowsingSlice.actions;

export default exerciseBrowsingSlice;
