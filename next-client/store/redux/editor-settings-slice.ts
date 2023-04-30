import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  keyboardBinding: 'default',
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
    setKeyboardBinding: (state, action) => {
      state.keyboardBinding = action.payload;
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
