import React from 'react';

import { IForumPostPopulated } from '../../../../models/interfaces';
import TextEditor from '../../../ui/editor/text-editor/TextEditor';
import TagsGroup from '../../../ui/labels/TagsGroup';
import ForumPostSpec from '../../../ui/spec/ForumPostSpec';
import PostControl from './PostControl';
import PostViewerActions from './PostViewerActions';

const PostBody: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
  return (
    <article className="flex flex-col gap-10 px-4 py-3">
      {/* Post header for heading, navigation and post information. */}
      <header>
        {/* Heading mobile breakpoint is md - 768px */}
        <div className="flex flex-col md:flex-row gap-2 gap-y-4 md:items-center">
          <h2 className="order-2 md:order-none text-gray-600 text-xl lg:text-2xl">
            {post.name}
          </h2>
          <PostControl post={post} className="md:ml-auto" />
        </div>

        <ForumPostSpec
          post={post}
          pictureUrl={post.author?.pictureUrl}
          className="mt-4"
        />
      </header>
      {/* Post main body content */}
      <TextEditor className="text-gray-600" value={post.content || ''} readOnly={true} />
      <footer className="flex flex-col">
        <PostViewerActions key={post._id} post={post} />
        <TagsGroup tags={post.tags} className="mt-4" />
      </footer>
    </article>
  );
};

export default PostBody;
