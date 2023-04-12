import { Quill } from 'react-quill';
import hljs from 'highlight.js';

import { imageUploader } from './ImageUploader';

hljs.configure({
  languages: ['javascript', 'python', 'cpp', 'c', 'php', 'java'],
});

const fontSizeArr = [
  '10px',
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '32px',
  '42px',
  '54px',
  '68px',
  '84px',
  '98px',
];

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = [
  'calibri',
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  toolbar: {
    container: '#toolbar',
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  imageUploader: imageUploader,
};

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
];

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id="toolbar" className="sticky top-0 bg-gray-50 !z-[50]">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="calibri">Calibri</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        {fontSizeArr.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
    </span>
    <span className="ql-formats">
      <button className="ql-code-block" />
    </span>
  </div>
);

export default QuillToolbar;
