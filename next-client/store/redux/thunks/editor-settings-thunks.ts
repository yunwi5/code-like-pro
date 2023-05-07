import { createAsyncThunk } from '@reduxjs/toolkit';

import * as EditorSettingsAPI from '@/apis/editor-settings.api';
import { ICreateUserEditorSettings, IUserEditorSettings } from '@/models/interfaces';

export const getUserEditorSettings = createAsyncThunk<IUserEditorSettings>(
  'settings/getUserSettings',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await EditorSettingsAPI.getUserEditorSettings();
      if (data == null) throw new Error('Could not get user editor settings');

      return data!;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get user editor settings';
      return rejectWithValue(message);
    }
  },
);

export const updateUserEditorSettings = createAsyncThunk<
  IUserEditorSettings,
  ICreateUserEditorSettings
>('settings/updateUserSettings', async (payload, { rejectWithValue }) => {
  try {
    console.log('payload:', payload);
    const { data } = await EditorSettingsAPI.putUserEditorSettings(payload);
    if (data == null) throw new Error('Could not update user editor settings');

    return data!;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update user editor settings';
    return rejectWithValue(message);
  }
});
