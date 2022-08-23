import React, { useState } from 'react';
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
    const [tags, setTags] = useState<string[]>([]);

    const handleAdd = (newTag: string) => {
        if (tags.includes(newTag)) return;
        setTags([...tags, newTag]);
    };

    const handleDelete = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    console.table(tags);

    return (
        <div>
            <AutoComplete
                id="challenge-tags"
                options={PredefinedTags.sort()}
                label={'Tags (multiple):'}
                onAdd={handleAdd}
            />
            <div></div>
        </div>
    );
};

export default ChallengeTags;
