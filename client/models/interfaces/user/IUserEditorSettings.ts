import { EditorType, FontSize, TabSize } from '@/components/ui/editor/code-editor/code-editor.util';

export interface ICreateUserEditorSettings {
  theme: string;
  editorType: EditorType;
  fontSize: FontSize;
  tabSize: TabSize;
}

export interface IUserEditorSettings extends ICreateUserEditorSettings {
  _id: string;
  user: string;
}
