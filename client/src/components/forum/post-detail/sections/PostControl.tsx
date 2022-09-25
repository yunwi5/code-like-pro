import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { IForumPost, IForumPostPopulated } from '../../../../models/interfaces';
import { useAppSelector } from '../../../../store/redux/store';
import { getForumPostLink } from '../../../../utils/links';
import PostSettings from './PostSettings';

const navButtonClass =
    'btn btn-small text-[1em] flex-center gap-2 bg-gray-200 hover:text-white hover:bg-gray-600/70';
const navButtonDisabledClass =
    'opacity-50 cursor-not-allowed hover:!text-gray-600 hover:!bg-gray-200';

// Post naigation (previous, next) and settings.
const PostControl: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
    const navigate = useNavigate();
    const posts = useAppSelector((state) => state.forum.posts);

    const postIndex = posts.findIndex((p) => p._id === post._id);
    const prevPost: IForumPost | undefined = posts[postIndex - 1];
    const nextPost: IForumPost | undefined = posts[postIndex + 1];

    return (
        <div className="flex justify-between items-center gap-3 ml-auto text-[0.9rem]">
            <button
                onClick={() => prevPost && navigate(getForumPostLink(prevPost))}
                disabled={!prevPost}
                className={`${navButtonClass} ${!prevPost ? navButtonDisabledClass : ''}`}
            >
                <BsArrowLeftShort className="text-2xl" />
                Previous
            </button>
            <button
                onClick={() => nextPost && navigate(getForumPostLink(nextPost))}
                disabled={!nextPost}
                className={`${navButtonClass} ${!nextPost ? navButtonDisabledClass : ''}`}
            >
                Next
                <BsArrowRightShort className="text-2xl" />
            </button>
            <PostSettings post={post} />
        </div>
    );
};

export default PostControl;
