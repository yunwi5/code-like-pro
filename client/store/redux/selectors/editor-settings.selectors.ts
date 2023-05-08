import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

// Selectors
export const selectEditorSettings = (state: RootState) => state.editorSettings;

export const selectTheme = createSelector(
  selectEditorSettings,
  (editorSettings) => editorSettings.theme,
);

export const selectEditorType = createSelector(
  selectEditorSettings,
  (editorSettings) => editorSettings.editorType,
);

export const selectFontSize = createSelector(
  selectEditorSettings,
  (editorSettings) => editorSettings.fontSize,
);

export const selectTabSize = createSelector(
  selectEditorSettings,
  (editorSettings) => editorSettings.tabSize,
);
