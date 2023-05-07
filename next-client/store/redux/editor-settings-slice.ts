import { createSlice } from '@reduxjs/toolkit';

import { EditorType, FontSize, TabSize } from '@/components/ui/editor/code-editor/code-editor.util';

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
});

export const editorSettingsActions = editorSettingsSlice.actions;

export default editorSettingsSlice;
