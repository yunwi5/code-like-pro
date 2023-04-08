import { useRouter } from 'next/router';
import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import useForumBrowsing from '../../../../hooks/useForumBrowsing';

import { IForumPost, IForumPostPopulated } from '../../../../models/interfaces';
import { useUserContext } from '../../../../store/context/UserContext';
import { getForumPostLink } from '../../../../utils/links.util';
import PostSettings from './PostSettings';

const navButtonClass =
  'btn btn-small text-[1em] flex-center gap-2 bg-gray-200 hover:text-white hover:bg-gray-600/70';
const navButtonDisabledClass =
  'opacity-50 cursor-not-allowed hover:!text-gray-600 hover:!bg-gray-200';

interface Props {
  post: IForumPostPopulated;
  className?: string;
}

// Post naigation (previous, next) and settings.
const PostControl: React.FC<Props> = ({ post, className = '' }) => {
  const router = useRouter();
  const { userDetail } = useUserContext();
  const { posts } = useForumBrowsing();

  const postIndex = posts.findIndex((p) => p._id === post._id);
  const prevPost: IForumPost | undefined = posts[postIndex - 1];
  const nextPost: IForumPost | undefined = posts[postIndex + 1];

  // Show settings only if the user is the author of the post
  const isAthor = post.author._id === userDetail?._id;

  return (
    <div className={`flex justify-between items-center gap-3 text-[0.9rem] ${className}`}>
      <button
        onClick={() => prevPost && router.push(getForumPostLink(prevPost))}
        disabled={!prevPost}
        className={`${navButtonClass} ${!prevPost ? navButtonDisabledClass : ''}`}
      >
        <BsArrowLeftShort className="text-2xl" />
        Previous
      </button>
      <button
        onClick={() => nextPost && router.push(getForumPostLink(nextPost))}
        disabled={!nextPost}
        className={`${navButtonClass} ${!nextPost ? navButtonDisabledClass : ''}`}
      >
        Next
        <BsArrowRightShort className="text-2xl" />
      </button>
      {isAthor && <PostSettings post={post} />}
    </div>
  );
};

export default PostControl;
