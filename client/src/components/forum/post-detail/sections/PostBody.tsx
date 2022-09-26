import React from 'react';
import { BsFillTagsFill, BsHeartFill } from 'react-icons/bs';

import { IForumPostPopulated } from '../../../../models/interfaces';
import TextEditor from '../../../ui/editor/text-editor/TextEditor';
import TagsGroup from '../../../ui/labels/TagsGroup';
import ForumPostSpec from '../../../ui/spec/ForumPostSpec';
import PostControl from './PostControl';
import PostLike from './PostLike';

const PostBody: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
    return (
        <article className="flex flex-col gap-10 px-4 py-3">
            <header>
                <div className="flex gap-2 items-center">
                    <h2 className="text-gray-600 text-2xl">{post.name}</h2>
                    <PostControl post={post} />
                </div>

                <ForumPostSpec
                    post={post}
                    pictureUrl={post.author?.pictureUrl}
                    className="mt-4"
                />
            </header>
            <TextEditor value={post.content || ''} readOnly={true} />
            <footer className="flex flex-col">
                {/* Post like icon & functionality */}
                <div className="flex justify-center items-center">
                    <PostLike post={post} />
                </div>

                <TagsGroup tags={post.tags} className="mt-4" />
            </footer>
        </article>
    );
};

export default PostBody;
