import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import monaco from 'monaco-editor';

import { Language } from '../../../models/enums';
import { prettierLanguageName } from '../../../utils/language.util';
import ExpandShrinkToggler from '../buttons/icon-buttons/ExpandShrinkToggler';

import styles from './CodeEditor.module.scss';

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
  className = '',
  editorClassName = '',
}) => {
  const editorRef = useRef<MonacoCodeEditor>(null);
  const [isShrinked, setIsShrinked] = useState(false);

  const handleMount = (editor: MonacoCodeEditor, monaco: Monaco) => {
    (editorRef as any).current = editor;
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    // here is the monaco instance
    // do some configuration before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  };

  // const updateEditorTabSize = (tabSize: number) => {
  // editorRef.current?.updateOptions({ tabSize });
  // };

  return (
    <div
      className={`${styles['editor-wrapper']} relative flex flex-col border-2 bg-white border-gray-300 shadow-md focus-within:shadow-lg focus-within:outline focus-within:outline-2 focus-within:outline-gray-200 rounded-sm overflow-hidden ${className}`}
    >
      {showHeader && (
        <div className="flex-between px-3 py-2 text-gray-700 bg-gray-300/90 capitalize text-lg">
          {language ? prettierLanguageName(language) : 'Python'}
          <ExpandShrinkToggler isShrinked={isShrinked} setIsShrinked={setIsShrinked} />
        </div>
      )}
      {!isShrinked && (
        <>
          <Editor
            className={`min-h-[7.5rem] pt-3 max-w-[90vw] lg:max-w-[80vw] max-h-[100vh] overflow-hidden ${editorClassName}`}
            language={getMonacoLanguageName(language) ?? 'python'}
            value={value}
            onChange={(value: string | undefined) => onChange(value || '')}
            beforeMount={handleEditorWillMount}
            onMount={handleMount}
            width={width}
            height={height}
            options={{ readOnly: readOnly }}
          />

          {/* Clear user code button */}
          {!readOnly && (
            <button
              onClick={() => onChange('')}
              className={`${styles['clear-btn']} absolute bottom-3 right-3 px-3 py-1 bg-gray-600/90 hover:bg-gray-700 text-white transition-all rounded shadow`}
            >
              Clear
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Map our app language names to Monaco languagee names
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
