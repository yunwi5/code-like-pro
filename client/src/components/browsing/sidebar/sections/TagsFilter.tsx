import { ProgrammingTopicList } from '../../../../models/enums';
import { browsingActions } from '../../../../store/redux/browsing-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';

const exampleTags = [...ProgrammingTopicList];

const TagsFilter = () => {
    const tags = useAppSelector((state) => state.browsing.filtering.tags);
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Tags</p>
            <ul className="grid grid-cols-2 gap-2">
                {exampleTags.map((tag) => {
                    const activeClass = tags.includes(tag)
                        ? '!bg-gray-600/90 !text-gray-50'
                        : '';

                    return (
                        <li
                            key={tag}
                            onClick={() => dispatch(browsingActions.toggleTags(tag))}
                            className={`px-2 py-[0.2rem] bg-gray-300/80 cursor-pointer hover:bg-gray-600/90 hover:text-gray-50 ${activeClass}`}
                        >
                            #{tag}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TagsFilter;
