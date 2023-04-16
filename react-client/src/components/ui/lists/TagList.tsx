import React from 'react';
import { BsFillTagsFill } from 'react-icons/bs';
import Tag from '../labels/Tag';

interface Props {
    title?: string;
    className?: string;
    tags: string[];
}

const TagList: React.FC<Props> = ({ title, tags, className = '' }) => {
    return (
        <div className={className}>
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    <p className="flex-start gap-1">
                        <BsFillTagsFill className="text-slate-500" />
                        {title}
                    </p>
                    <ul className="flex flex-wrap gap-x-3 gap-y-2">
                        {tags.map((tag, idx) => (
                            <Tag key={idx} name={tag} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TagList;
