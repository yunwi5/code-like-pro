import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForumPostSortingKey, SearchKey, SortingDirection } from '../../models/enums';
import { IForumPost } from '../../models/interfaces';

// Forum post search state
export interface IForumSearchState {
    key: SearchKey;
    text: string;
}

// Forum post sorting state
export interface IForumSortingState {
    key: ForumPostSortingKey;
    direction: SortingDirection;
}

interface IForumState {
    posts: IForumPost[];
    searching: IForumSearchState;
    sorting: IForumSortingState;
}

const initialState: IForumState = {
    posts: [],
    searching: { key: SearchKey.TITLE, text: '' },
    sorting: { key: ForumPostSortingKey.NONE, direction: SortingDirection.DESCENDING },
};

const forumSlice = createSlice({
    name: 'forum-browsing',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<IForumPost[]>) {
            state.posts = action.payload;
        },
        setSorting(state, action: PayloadAction<IForumSortingState>) {
            state.sorting = action.payload;
        },
        setSearching(state, action: PayloadAction<IForumSearchState>) {
            state.searching = action.payload;
        },
        clear(state) {
            state.sorting = initialState.sorting;
            state.searching = initialState.searching;
        },
    },
});

export const forumActions = forumSlice.actions;

export default forumSlice;
