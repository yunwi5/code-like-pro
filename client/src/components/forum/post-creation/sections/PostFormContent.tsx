import React from 'react';
import { usePostCreationContext } from '../../../../store/context/PostCreationContext';
import TextEditor from '../../../ui/editor/text-editor/TextEditor';

const PostFormContent = () => {
    const { content, setContent } = usePostCreationContext();

    return (
        <section className="flex flex-col gap-2">
            <p className="">Post Content</p>
            <TextEditor
                onChange={(newContent: string) => setContent(newContent)}
                value={content}
                className="bg-white border-[1.5px] border-gray-200 rounded-sm overflow-hidden"
                placeholder="Write about your post..."
            />
        </section>
    );
};

export default PostFormContent;
