import React from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
// Text editor theme
import 'react-quill/dist/quill.snow.css';
// Code block syntax highlight theme
import 'highlight.js/styles/atom-one-light.css';

interface Props {
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
}

// Complete text editor for users to write their prompt.
export const TextEditor: React.FC<Props> = (props) => {
    const { onChange, value, placeholder, className = '', readOnly = false } = props;

    return (
        <div
            className={`shadow-sm ${
                readOnly ? 'read-only-editor' : ''
            } ${className} overflow-visible`}
        >
            <EditorToolbar />
            <ReactQuill
                theme="snow"
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                placeholder={placeholder ?? 'Write something awesome...'}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default TextEditor;
