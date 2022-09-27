import React from 'react';
import { BiCategoryAlt, BiCommentDots } from 'react-icons/bi';
import { BsClock, BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { IForumPost, IForumPostPopulated } from '../../../models/interfaces';
import { getDateTimeFormat } from '../../../utils/datetime';
import { ForumTypeIcons } from '../../../utils/forum';
import ProfilePicture from '../user/ProfilePicture';

interface Props {
    post: IForumPost | IForumPostPopulated;
    pictureUrl?: string; // Picture url of the post author. If it is undefined, default user icon is displayed.
    className?: string;
}

const spectItemClass = 'flex items-center gap-1 md:gap-2';

const ForumPostSpec: React.FC<Props> = ({ post, pictureUrl, className }) => {
    return (
        <ul
            className={`flex flex-wrap gap-x-2 md:gap-x-4 gap-y-2 text-sm md:text-base ${className}`}
        >
            <li className={spectItemClass}>
                {pictureUrl ? (
                    <ProfilePicture picture={post.author.pictureUrl} size={'1.6rem'} />
                ) : (
                    <FaUserEdit className="text-gray-600 text-[1.2em]" />
                )}
                {post.author.name}
            </li>
            <li className={spectItemClass}>
                <BsClock className="text-sky-500/80 text-[1.3em]" />
                {getDateTimeFormat(post.createdAt)}
            </li>
            <li className={`${spectItemClass} capitalize`}>
                <BiCategoryAlt className="text-blue-500/80 text-[1.2em]" />
                {post.category}
            </li>
            <li className={`${spectItemClass} capitalize`}>
                <span className="text-main-400 text-base">
                    {ForumTypeIcons[post.postType]}
                </span>
                {post.postType}
            </li>
            <li className={spectItemClass}>
                <BsHeart className="text-pink-500/80 text-[1.2em]" />
                {post.liked.length} Like{post.liked.length > 1 && 's'}
            </li>

            <li className="hidden xl:flex items-center gap-2">
                <BiCommentDots className="text-slate-600 text-[1.2em]" />
                {post.comments.length} Comment{post.comments.length > 1 && 's'}
            </li>
        </ul>
    );
};

export default ForumPostSpec;
