import React from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BiCategoryAlt, BiCommentDots } from 'react-icons/bi';
import { BsClock } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';

import { IForumPost, IForumPostPopulated } from '../../../models/interfaces';
import { getDateTimeFormat } from '../../../utils/datetime';
import { ForumPostTypeIcons } from '../../../utils/forum';
import { getVoteCounts } from '../../../utils/votes';
import ProfileView from '../user/profile-view/ProfileView';

interface Props {
    post: IForumPost | IForumPostPopulated;
    picture?: string; // Picture url of the post author. If it is undefined, default user icon is displayed.
    className?: string;
}

const spectItemClass = 'flex items-center gap-1 md:gap-2';

const ForumPostSpec: React.FC<Props> = ({ post, picture, className }) => {
    const { upVoteCount, downVoteCount } = getVoteCounts(post.votes || []);

    return (
        <ul
            className={`flex flex-wrap gap-x-2 md:gap-x-4 gap-y-2 text-sm md:text-base ${className}`}
        >
            <li className={spectItemClass}>
                {picture ? (
                    <ProfileView user={post.author} size={'1.65rem'} />
                ) : (
                    <>
                        <FaUserEdit className="text-gray-600 text-[1.2em]" />
                        {post.author.name}
                    </>
                )}
            </li>
            <li className={`${spectItemClass} capitalize`}>
                <span className="text-pink-400 text-xl">
                    {ForumPostTypeIcons[post.postType]}
                </span>
                {post.postType}
            </li>
            <li className={spectItemClass}>
                <BsClock className="text-sky-500/80 text-[1.3em]" />
                {getDateTimeFormat(post.createdAt)}
            </li>
            <li className={`${spectItemClass} capitalize`}>
                <BiCategoryAlt className="text-blue-500/80 text-[1.2em]" />
                {post.category}
            </li>
            <li className={spectItemClass}>
                <AiOutlineLike className="text-indigo-600 text-[1.2em]" />
                {upVoteCount} Like{upVoteCount !== 1 && 's'}
            </li>
            <li className={spectItemClass}>
                <AiOutlineDislike className="text-slate-600 text-[1.2em]" />
                {downVoteCount} Dislike{downVoteCount !== 1 && 's'}
            </li>
            {/* <li className="hidden xl:flex items-center gap-2">
                <BiCommentDots className="text-slate-600 text-[1.2em]" />
                {post.comments.length} Comment{post.comments.length > 1 && 's'}
            </li> */}
        </ul>
    );
};

export default ForumPostSpec;
