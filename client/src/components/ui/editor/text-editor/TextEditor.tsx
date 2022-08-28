import React from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';

interface Props {
    onChange(value: string): void;
    value: string;
    className?: string;
    placeholder?: string;
}

// Complete text editor for users to write their prompt.
export const TextEditor: React.FC<Props> = ({ onChange, value, placeholder, className }) => {
    return (
        <div className={`shadow-sm ${className ?? ''}`}>
            <EditorToolbar />
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? 'Write something awesome...'}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default TextEditor;
