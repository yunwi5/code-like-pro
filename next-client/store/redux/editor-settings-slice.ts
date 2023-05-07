import { createSlice } from '@reduxjs/toolkit';

import { EditorType, FontSize, TabSize } from '@/components/ui/editor/code-editor/code-editor.util';

import { getUserEditorSettings, updateUserEditorSettings } from './thunks/editor-settings-thunks';

interface EditorSettingsState {
  theme: string;
  editorType: EditorType;
  fontSize: FontSize;
  tabSize: TabSize;
}

const initialState: EditorSettingsState = {
  theme: 'light',
  editorType: EditorType.DEFAULT,
  fontSize: 12,
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
  extraReducers: (builder) => {
    builder
      .addCase(getUserEditorSettings.fulfilled, (state, action) => {
        const existingSettings = action.payload;

        state.theme = existingSettings.theme ?? 'light';
        state.editorType = existingSettings.editorType ?? EditorType.DEFAULT;
        state.fontSize = existingSettings.fontSize ?? 12;
        state.tabSize = existingSettings.tabSize ?? 4;
      })
      .addCase(updateUserEditorSettings.fulfilled, (state, action) => {
        const existingSettings = action.payload;

        state.theme = existingSettings.theme;
        state.editorType = existingSettings.editorType;
        state.fontSize = existingSettings.fontSize;
        state.tabSize = existingSettings.tabSize;
      });
  },
});

export const editorSettingsActions = editorSettingsSlice.actions;

export default editorSettingsSlice;
