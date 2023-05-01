'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

// import { initVimMode } from 'monaco-vim';
import { selectEditorType, selectTheme } from '@/store/redux/selectors/editor-settings.selectors';
import { copyToClipboard } from '@/utils/clipboard.util';

import { Language } from '../../../../models/enums';
import { prettierLanguageName } from '../../../../utils/language.util';
import Button from '../../buttons/Button';
import CopyClipboardButton from '../../buttons/CopyClipboardButton';
import ExpandShrinkToggler from '../../buttons/icon-buttons/ExpandShrinkToggler';

import { loadCustomMonacoThemes } from './code-editor.util';

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
}) => {
  const theme = useSelector(selectTheme);
  const editorType = useSelector(selectEditorType);
  const [isShrinked, setIsShrinked] = useState(false);
  const editorRef = useRef<MonacoCodeEditor>(null);
  const [vimMode, setVimMode] = useState<any | null>(null);

  const handleMount = async (editor: MonacoCodeEditor) => {
    (editorRef as any).current = editor;

    editor.addAction({
      // an unique identifier of the contributed action
      id: 'some-unique-id',
      // a label of the action that will be presented to the user
      label: 'Some label!',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],

      // the method that will be executed when the action is triggered.
      run: function (editor) {
        alert('we wanna save something => ' + editor.getValue());
      },
    });

    // setup monaco-vim
    const { vimMode, VimMode } = await loadMonacoVim(editor);
    console.log({ vimMode, VimMode });
    setVimMode(vimMode);

    VimMode.Vim.map('<A-c>', '<Esc>', 'normal');
    VimMode.Vim.map('<A-c>', '<Esc>', 'insert');
    VimMode.Vim.map('<A-c>', '<Esc>', 'visual');
    VimMode.Vim.map('<A-c>', '<Esc>', 'operator-pending');
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    loadCustomMonacoThemes(monaco);
  };

  const handleCopyClipboard = async () => {
    await copyToClipboard(value || '');
  };

  const handleUnloadVim = () => {
    if (vimMode) {
      vimMode.dispose();
    }
  };

  // Not used for now
  // const updateEditorTabSize = (tabSize: number) => {
  // editorRef.current?.updateOptions({ tabSize });
  // };

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
            <Button onClick={handleUnloadVim} className="absolute bottom-2 right-2">
              Unload vim
            </Button>
          </>
        )}
      </div>
      <div id="vim-statusbar"></div>
    </div>
  );
};

function loadMonacoVim(
  editor: monaco.editor.IStandaloneCodeEditor,
): Promise<{ vimMode: any; VimMode: any }> {
  return new Promise((resolve) => {
    (window as any).require.config({
      paths: {
        'monaco-vim': 'https://unpkg.com/monaco-vim/dist/monaco-vim',
      },
    });

    (window as any).require(['monaco-vim'], function (MonacoVim: any) {
      const statusNode = document.getElementById('vim-statusbar');
      const vimMode = MonacoVim.initVimMode(editor, statusNode);
      resolve({ vimMode, VimMode: MonacoVim.VimMode });
    });
  });
}

function loadMonacoEmacs(editor: monaco.editor.IStandaloneCodeEditor) {
  return new Promise((resolve) => {
    (window as any).require.config({
      paths: {
        'monaco-emacs': 'https://unpkg.com/monaco-emacs/dist/monaco-emacs',
      },
    });
    (window as any).equire(['monaco-emacs'], function (MonacoEmacs: any) {
      const statusNode = document.getElementById('emacs-statusbar');
      const emacsMode = new MonacoEmacs.EmacsExtension(editor);
      emacsMode.onDidMarkChange(function (ev: string) {
        if (statusNode) statusNode.textContent = ev ? 'Mark Set!' : 'Mark Unset';
      });
      emacsMode.onDidChangeKey(function (str: string) {
        if (statusNode) statusNode.textContent = str;
      });
      emacsMode.start();

      resolve(emacsMode);
    });
  });
}

// Map app language names to Monaco languagee names
// For example, we use the name C++ which should be mapped to cpp for monaco language config.
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
