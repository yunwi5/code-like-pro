import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import exerciseBrowsingSlice from './browsing-slice';
import editorSettingsSlice from './editor-settings-slice';
import forumBrowsingSlice from './forum-slice';

const store = configureStore({
  reducer: {
    browsing: exerciseBrowsingSlice.reducer,
    forum: forumBrowsingSlice.reducer,
    editorSettings: editorSettingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Custom State Type and Dispatch Type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
