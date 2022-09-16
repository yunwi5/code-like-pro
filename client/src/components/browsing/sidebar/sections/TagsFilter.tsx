import { useEffect, useState } from 'react';
import { ProgrammingTopicList } from '../../../../models/enums';
import { IExerciseCard } from '../../../../models/interfaces';
import { browsingActions } from '../../../../store/redux/browsing-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';
import { getTagsCount } from '../../../../utils/tag';

const exampleTags = [...ProgrammingTopicList];
type CountMap = { [key: string]: number };

const TagsFilter: React.FC<{ exercises: IExerciseCard[] }> = ({ exercises }) => {
    const tags = useAppSelector((state) => state.browsing.filtering.tags);
    const dispatch = useAppDispatch();

    const [tagCountMap, setTagCountMap] = useState<CountMap>({});

    useEffect(() => {
        // Get statistics of exercise tags
        // Such as how many exercises have a particular tag, and store the count of each tag.
        const result = getTagsCount(exercises);
        setTagCountMap(result);
    }, [exercises]);

    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Tags</p>
            <ul className="grid grid-cols-2 gap-2">
                {exampleTags.map((tag) => {
                    const activeClass = tags.includes(tag)
                        ? '!bg-gray-600/90 !text-gray-50'
                        : '';

                    // If the tag is too long, give it a bit smaller font size.
                    const textSizeClass =
                        tag.length > 15 ? 'sm:text-[0.835rem]' : 'sm:text-[0.9rem]';

                    return (
                        <li
                            key={tag}
                            onClick={() => dispatch(browsingActions.toggleTags(tag))}
                            className={`px-2 py-[0.2rem] text-[0.85rem] bg-gray-300/80 cursor-pointer hover:bg-gray-600/90 hover:text-gray-50 ${textSizeClass} ${activeClass}`}
                        >
                            {tag} ({tagCountMap[tag] || 0})
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TagsFilter;
