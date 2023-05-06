import { createSlice } from '@reduxjs/toolkit';

export enum EditorType {
  DEFAULT = 'default',
  VIM = 'vim',
  EMACS = 'emacs',
}

interface EditorSettingsState {
  theme: string;
  editorType: EditorType;
  fontSize: string;
  tabSize: 2 | 4 | 6;
}

const initialState: EditorSettingsState = {
  theme: 'light',
  editorType: EditorType.DEFAULT,
  fontSize: '14px',
  tabSize: 4,
};

const editorSettingsSlice = createSlice({
  name: 'editorSettings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setEditorType: (state, action) => {
      state.editorType = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setTabSize: (state, action) => {
      state.tabSize = action.payload;
    },
  },
});

export const editorSettingsActions = editorSettingsSlice.actions;

export default editorSettingsSlice;
