import React from 'react';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import Tag from '../../ui/design-elements/Tag';
import AutoComplete from '../../ui/inputs/AutoComplete';

const PredefinedTags = [
    'COMPSCI 101',
    'COMPSCI 130',
    'COMPSCI 230',
    'COMPSCI 235',
    'COMPSCI 335',
    'COMPSCI 367',
    'COMPSCI 373',
    'COMPSCI 399',
    'Binary Search Tree',
    'Graph Algorithms',
    'Time Complexity',
    'Space Complexity',
];

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
            <div className="flex flex-wrap gap-x-3 gap-y-2 px-3 py-2 min-h-[2.5rem] rounded-md border-[3px] border-slate-300">
                {tags.map((tag, idx) => (
                    <Tag key={idx} name={tag} onDelete={() => handleDelete(tag)} />
                ))}
            </div>
        </div>
    );
};

export default ChallengeTags;
