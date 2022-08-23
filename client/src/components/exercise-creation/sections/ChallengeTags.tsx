import React from 'react';
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
    const handleAdd = (newTag: string) => {
        console.log(newTag);
    };

    return (
        <div>
            <AutoComplete
                id="challenge-tags"
                options={PredefinedTags.sort()}
                label={'Tags (multiple):'}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default ChallengeTags;
