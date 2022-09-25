import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import exerciseBrowsingSlice from './browsing-slice';
import forumBrowsingSlice from './forum-slice';

const store = configureStore({
    reducer: {
        browsing: exerciseBrowsingSlice.reducer,
        forum: forumBrowsingSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

// TypeScript typed redux settings
// Custom State Type and Dispatch Type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
