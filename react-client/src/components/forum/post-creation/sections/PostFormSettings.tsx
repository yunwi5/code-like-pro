import React from 'react';
import {
    ForumCategory,
    ForumCategoryList,
    ForumPostType,
    ForumPostTypeList,
} from '../../../../models/enums';
import { usePostCreationContext } from '../../../../store/context/PostCreationContext';
import { capitalizeString } from '../../../../utils/string-utils/string-manipulation';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const PostFormSettings: React.FC = () => {
    const { postType, setPostType, category, setCategory } = usePostCreationContext();

    return (
        <section className="flex flex-col md:flex-row gap-5 justify-between">
            <CustomSelect
                id="post-type"
                labelText="Post Type"
                options={ForumPostTypeList}
                value={postType}
                className="flex-1"
                onChange={(newPostType: string) =>
                    setPostType(newPostType as ForumPostType)
                }
            />
            <CustomSelect
                id="post-category"
                labelText="Forum Category"
                options={ForumCategoryList}
                optionLabels={ForumCategoryList.map((cat) => capitalizeString(cat))}
                value={category}
                className="flex-1"
                onChange={(category: string) => setCategory(category as ForumCategory)}
            />
        </section>
    );
};

export default PostFormSettings;
