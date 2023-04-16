import React from 'react';
import { BsFillTagsFill } from 'react-icons/bs';

// Group of tags rendered as a list in small sizes.
// Mainly used in ExerciseCard and ForumPostCard components for rendering its tags in small sizes as a group.
const TagsGroup: React.FC<{ tags: string[]; className?: string }> = ({
    tags,
    className = '',
}) => {
    return (
        <ul className={`flex-start flex-wrap gap-2 text-[0.85rem] ${className}`}>
            <BsFillTagsFill className="text-lg text-slate-500" />

            {tags.slice(0, 5).map((tag, idx) => (
                <li
                    key={idx}
                    className="px-2 py-[0.125rem] bg-gray-400/40 hover:bg-gray-600/90 hover:text-gray-50 rounded-sm"
                >
                    {tag}
                </li>
            ))}
        </ul>
    );
};

export default TagsGroup;
