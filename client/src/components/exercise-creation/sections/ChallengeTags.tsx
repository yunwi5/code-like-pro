import React from 'react';
import { ProgrammingTopicList } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import Tag from '../../ui/design-elements/Tag';
import AutoComplete from '../../ui/inputs/AutoComplete';

const PredefinedTags = [...ProgrammingTopicList];

const ChallengeTags: React.FC = () => {
    const { tags, setTags } = useExerciseCreationContext();

    const handleAdd = (newTag: string) => {
        newTag = newTag.trim();
        if (tags.includes(newTag)) return;
        setTags([...tags, newTag]);
    };

    const handleDelete = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    return (
        <div className="flex flex-col gap-5">
            <AutoComplete
                id="challenge-tags"
                options={PredefinedTags.sort()}
                label={'Tags (multiple):'}
                placeholder="Enter predefined or your own tags"
                onAdd={handleAdd}
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

export default ChallengeTags;
