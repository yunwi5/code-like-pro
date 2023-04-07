import React, { useState } from 'react';
import { usePostCreationContext } from '../../../../store/context/PostCreationContext';
import { ForumTags } from '../../../../utils/forum.util';
import AutoComplete from '../../../ui/inputs/AutoComplete';
import Tag from '../../../ui/labels/Tag';

const PostFormTags: React.FC = () => {
  const { tags, setTags, category } = usePostCreationContext();
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (newTag: string) => {
    newTag = newTag.trim();
    if (tags.includes(newTag)) return;
    // Maximum 5 tags, if the user tries to exceeds, show error message.
    if (tags.length >= 5) return setError('Sorry, maximum 5 tags!');

    setTags([...tags, newTag]);
  };

  const handleDelete = (tagToDelete: string) => {
    setError(null);
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Post tags depend on the post category
  const postTags = ForumTags[category] || [];

  return (
    <section className="flex flex-col gap-5">
      <AutoComplete
        id="post-tags"
        options={postTags}
        label={'Tags:'}
        placeholder="Enter predefined or your own tags"
        onAdd={handleAdd}
        error={error}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-2 px-3 py-2 rounded-md border-[3px] bg-gray-50 border-slate-300">
          {tags.map((tag, idx) => (
            <Tag key={idx} name={tag} onDelete={() => handleDelete(tag)} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PostFormTags;
