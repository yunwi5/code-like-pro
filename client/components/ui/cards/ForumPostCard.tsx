import React from 'react';
import Link from 'next/link';

import { IForumPost } from '../../../models/interfaces';
import { getForumPostLink } from '../../../utils/links.util';
import TagsGroup from '../labels/TagsGroup';
import ForumPostSpec from '../spec/ForumPostSpec';
import HoveringLabel from '../tooltip/HoveringLabel';
import ProfilePicture from '../user/ProfilePicture';

const ForumPostCard: React.FC<{ post: IForumPost }> = ({ post }) => {
  return (
    <article className="card flex items-center gap-3 lg:gap-5 xl:gap-8 px-3 lg:px-5 xl:px-8 py-2 odd:bg-gray-100 even:bg-gray-200/80">
      <ProfilePicture picture={post.author.picture} alt={post.author.name} size={'3rem'} />
      <div className="flex flex-col gap-2">
        <h3 className="w-fit text-gray-600/90">
          <HoveringLabel label="Read It" className="hover:text-main-500 text-base">
            <Link href={getForumPostLink(post)} className="text-lg lg:text-xl">
              {post.name}
            </Link>
          </HoveringLabel>
        </h3>
        <ForumPostSpec post={post} />
        <TagsGroup tags={post.tags} className="hidden md:flex mt-1" />
      </div>
    </article>
  );
};

export default ForumPostCard;
