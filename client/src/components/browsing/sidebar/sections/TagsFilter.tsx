import React from 'react';
import { ProgrammingTopicList } from '../../../../models/enums';

const exampleTags = [...ProgrammingTopicList];

const TagsFilter = () => {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Tags</p>
            <ul className="grid grid-cols-2 gap-2">
                {exampleTags.map((diff) => (
                    <li
                        className={
                            'px-2 py-[0.2rem] bg-gray-300/80 cursor-pointer hover:bg-gray-600/90 hover:text-gray-50'
                        }
                    >
                        #{diff}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagsFilter;
