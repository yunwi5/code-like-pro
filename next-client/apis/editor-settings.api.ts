import { ICreateUserEditorSettings, IUserEditorSettings } from '@/models/interfaces';

import { getRequest, putRequest } from './common-requests';

const API_DOMAIN = '/editorSettings';

export function getUserEditorSettings() {
  return getRequest<IUserEditorSettings>({
    url: `${API_DOMAIN}`,
  });
}

export function putUserEditorSettings(editorSettings: ICreateUserEditorSettings) {
  return putRequest<IUserEditorSettings>({
    url: `${API_DOMAIN}`,
    body: editorSettings,
  });
}
