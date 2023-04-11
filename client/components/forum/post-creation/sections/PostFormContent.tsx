'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { usePostCreationContext } from '../../../../store/context/PostCreationContext';

const TextEditor = dynamic(
  () => import('@/components/ui/editor/text-editor/TextEditor'),
  { ssr: false },
);

const PostFormContent = () => {
  const { content, setContent } = usePostCreationContext();

  return (
    <section className="flex flex-col gap-2">
      <p className="">Post Content</p>
      <TextEditor
        onChange={(newContent: string) => setContent(newContent)}
        value={content}
        className="bg-white border-[1.5px] border-gray-200 rounded-sm"
        placeholder="Write about your post..."
      />
    </section>
  );
};

export default PostFormContent;
