'use client';
import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import { copyToClipboard } from '@/utils/clipboard.util';

import monokai from '../../../../assets/themes/Monokai.json';
import { Language } from '../../../../models/enums';
import { prettierLanguageName } from '../../../../utils/language.util';
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
  const editorRef = useRef<MonacoCodeEditor>(null);
  const [isShrinked, setIsShrinked] = useState(false);

  const handleMount = (editor: MonacoCodeEditor) => {
    (editorRef as any).current = editor;
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    loadCustomMonacoThemes(monaco);
  };

  const handleCopyClipboard = async () => {
    await copyToClipboard(value || '');
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
              className={`min-h-[7.5rem] max-w-[100w] sm:max-w-[90vw] xl:max-w-[80vw] max-h-[100vh] overflow-hidden ${editorClassName}`}
              language={getMonacoLanguageName(language) ?? 'python'}
              value={value}
              onChange={(value: string | undefined) => onChange(value || '')}
              beforeMount={handleEditorWillMount}
              onMount={handleMount}
              width={width}
              height={height}
              options={{ readOnly: readOnly }}
              theme="monokai"
            />

            {clipboardEnabled && (
              <CopyClipboardButton
                onCopy={handleCopyClipboard}
                className={`editor-btn ${!value ? '!opacity-0 cursor-none' : ''}`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

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
