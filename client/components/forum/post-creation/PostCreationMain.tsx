import React from 'react';
import PostFormActions from './sections/PostFormActions';
import PostFormContent from './sections/PostFormContent';
import PostFormHeader from './sections/PostFormHeader';
import PostFormName from './sections/PostFormName';
import PostFormSettings from './sections/PostFormSettings';
import PostFormTags from './sections/PostFormTags';

/* Post creation wrapper */
const PostCreationMain: React.FC = () => {
  return (
    <main className="flex flex-col gap-7 text-base lg:text-lg card min-h-[max(70vh,40rem)] max-w-[95vw] md:max-w-[min(85vw,60rem)] mx-auto px-4 lg:px-8 py-5 text-gray-700 rounded border-2 border-gray-200/80 bg-gray-100/80 shadow">
      <PostFormHeader />
      <PostFormName />
      <PostFormSettings />
      <PostFormTags />
      <PostFormContent />
      <PostFormActions />
    </main>
  );
};

export default PostCreationMain;
