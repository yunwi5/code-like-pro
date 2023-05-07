'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import { selectEditorSettings } from '@/store/redux/selectors/editor-settings.selectors';
import { useAppDispatch } from '@/store/redux/store';
import { getUserEditorSettings } from '@/store/redux/thunks/editor-settings-thunks';
import { copyToClipboard } from '@/utils/clipboard.util';

import { Language } from '../../../../models/enums';
import { prettierLanguageName } from '../../../../utils/language.util';
import CopyClipboardButton from '../../buttons/CopyClipboardButton';
import ExpandShrinkToggler from '../../buttons/icon-buttons/ExpandShrinkToggler';

import {
  EditorType,
  loadCustomMonacoThemes,
  loadMonacoEmacs,
  loadMonacoVim,
} from './code-editor.util';

import './CodeEditor.scss';

type Monaco = typeof monaco;
type MonacoCodeEditor = monaco.editor.IStandaloneCodeEditor;

interface Props {
  onChange?: (value: string) => void;
  language?: Language;
  showHeader?: boolean;
  value?: string;
  width?: string;
  height?: string;
  validation?: boolean;
  readOnly?: boolean;
  clipboardEnabled?: boolean;
  className?: string;
  editorClassName?: string;
  runCode?: () => void;
  submitCode?: () => void;
}

const CodeEditor: React.FC<Props> = ({
  language,
  showHeader = true,
  onChange = () => {},
  width,
  height,
  value,
  readOnly = false,
  clipboardEnabled = true,
  className = '',
  editorClassName = '',
  runCode,
  submitCode,
}) => {
  const dispatch = useAppDispatch();
  const { editorType, theme, fontSize, tabSize } = useSelector(selectEditorSettings);
  const editorRef = useRef<MonacoCodeEditor>(null);

  const [isShrinked, setIsShrinked] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false); // TODO: remove this
  const [vimMode, setVimMode] = useState<any | null>(null);
  const [emacsMode, setEmacsMode] = useState<any | null>(null);

  const handleMount = async (editor: MonacoCodeEditor) => {
    (editorRef as any).current = editor;
  };

  const handleEditorWillMount = async (monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    await loadCustomMonacoThemes(monaco);
    setThemeLoaded(true);
  };

  const handleCopyClipboard = async () => {
    await copyToClipboard(value || '');
  };

  useEffect(() => {
    const setUpVim = async () => {
      if (editorRef.current == null) return;

      // setup monaco-vim
      const { vimMode, vimModeSettings } = await loadMonacoVim(editorRef.current);
      setVimMode(vimMode);

      vimModeSettings.Vim.map('<A-c>', '<Esc>', 'normal');
      vimModeSettings.Vim.map('<A-c>', '<Esc>', 'insert');
      vimModeSettings.Vim.map('<A-c>', '<Esc>', 'visual');
      vimModeSettings.Vim.map('<A-c>', '<Esc>', 'operator-pending');
    };

    const setUpEmacs = async () => {
      if (editorRef.current == null) return;

      // setup monaco-emacs
      const { emacsMode } = await loadMonacoEmacs(editorRef.current);
      setEmacsMode(emacsMode);
    };

    if (editorType === EditorType.VIM) setUpVim();
    else if (editorType === EditorType.EMACS) setUpEmacs();

    return () => {
      if (vimMode) vimMode.dispose();
      if (emacsMode) emacsMode.dispose();
    };
  }, [editorRef.current, editorType]);

  useEffect(() => {
    const addKeybindings = (event: KeyboardEvent) => {
      if (
        ((event.metaKey && event.code === 'Backquote') ||
          (event.ctrlKey && event.code === 'Backquote')) &&
        event.shiftKey
      ) {
        submitCode && submitCode();
      } else if (
        (event.metaKey && event.code === 'Backquote') ||
        (event.ctrlKey && event.code === 'Backquote')
      ) {
        runCode && runCode();
      }
    };

    document.addEventListener('keydown', addKeybindings);

    return () => document.removeEventListener('keydown', addKeybindings);
  }, [runCode, submitCode]);

  useEffect(() => {
    editorRef.current?.updateOptions({ fontSize, tabSize, theme });
  }, [tabSize, fontSize, theme, themeLoaded]);

  useEffect(() => {
    dispatch(getUserEditorSettings());
  }, [dispatch]);

  return (
    <div
      className={`editor-wrapper flex flex-col border-2 bg-white border-gray-300 shadow-md focus-within:shadow-lg focus-within:outline focus-within:outline-2 focus-within:outline-gray-200 rounded-sm overflow-hidden ${className}`}
    >
      {showHeader && (
        <div className="flex-between px-3 py-2 text-gray-700 bg-gray-300/90 capitalize text-lg">
          {language ? prettierLanguageName(language) : 'Python'}
          <ExpandShrinkToggler isShrinked={isShrinked} setIsShrinked={setIsShrinked} />
        </div>
      )}
      <div className="relative flex flex-col grow">
        {!isShrinked && (
          <>
            <Editor
              className={`min-h-[7.5rem] max-w-[100w] sm:max-w-[90vw] xl:max-w-[80vw] max-h-[100vh] overflow-hidden ${editorClassName} theme-${theme}`}
              language={getMonacoLanguageName(language) ?? 'python'}
              value={value}
              onChange={(value: string | undefined) => onChange(value || '')}
              beforeMount={handleEditorWillMount}
              onMount={handleMount}
              width={width}
              height={height}
              options={{ readOnly }}
              theme={theme}
            />

            {clipboardEnabled && (
              <CopyClipboardButton
                onCopy={handleCopyClipboard}
                className={`editor-btn ${!value ? '!opacity-0 cursor-none' : ''}`}
              />
            )}
          </>
        )}

        {editorType === EditorType.VIM && (
          <div
            className="absolute bottom-0 left-0 px-2 py-1 text-xs text-gray-400 brightness-90 rounded-tr"
            id="vim-statusbar"
          />
        )}
        {editorType === EditorType.EMACS && <div id="emacs-statusbar"></div>}
      </div>
    </div>
  );
};

/**
 * @param App language name
 * @returns Monaco language name
 */
function getMonacoLanguageName(lang: Language | undefined) {
  switch (lang) {
    case Language.JAVASCRIPT:
      return 'javascript';
    case Language.PYTHON:
      return 'python';
    default:
      return lang?.toLowerCase();
  }
}

export default CodeEditor;
