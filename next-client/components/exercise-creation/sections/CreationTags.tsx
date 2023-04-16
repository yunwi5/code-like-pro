import React, { useState } from 'react';

import { ProgrammingTopicList } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import AutoComplete from '../../ui/inputs/AutoComplete';
import Tag from '../../ui/labels/Tag';

const PredefinedTags = [...ProgrammingTopicList];

const CreationTags: React.FC = () => {
  const { tags, setTags } = useExerciseCreationContext();
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

  return (
    <div className="flex flex-col gap-5">
      <AutoComplete
        id="challenge-tags"
        options={PredefinedTags.sort()}
        label={'Tags:'}
        placeholder="Enter predefined or your own tags"
        onAdd={handleAdd}
        error={error}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-2 px-3 py-2 rounded-md border-[3px] border-slate-300">
          {tags.map((tag, idx) => (
            <Tag key={idx} name={tag} onDelete={() => handleDelete(tag)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreationTags;
