import React from 'react';
import { BiCategoryAlt, BiCommentDots } from 'react-icons/bi';
import { BsFillTagsFill, BsHeartFill } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

import { IForumPostPopulated } from '../../../../models/interfaces';
import { getDateTimeFormat } from '../../../../utils/datetime';
import { ForumTypeIcons } from '../../../../utils/forum';
import TextEditor from '../../../ui/editor/text-editor/TextEditor';
import ProfilePicture from '../../../ui/user/ProfilePicture';
import PostControl from './PostControl';
import PostLike from './PostLike';

const PostCard: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
    return (
        <article className="flex flex-col gap-10 px-4 py-3">
            <header>
                <div className="flex gap-2 items-center">
                    <h2 className="text-gray-600 text-2xl">{post.name}</h2>
                    <PostControl post={post} />
                </div>

                <ul className="text-base mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    <li className="flex items-center gap-2">
                        {post.author?.pictureUrl ? (
                            <ProfilePicture
                                picture={post.author.pictureUrl}
                                size={'1.6rem'}
                            />
                        ) : (
                            <FaUserEdit className="text-gray-600 text-[1.2em]" />
                        )}
                        {post.author.name}
                    </li>
                    <li className="flex items-center gap-2">
                        <MdDateRange className="text-sky-500/80 text-[1.3em]" />
                        {getDateTimeFormat(post.createdAt)}
                    </li>
                    <li className="flex items-center gap-2 capitalize">
                        <BiCategoryAlt className="text-blue-500/80 text-[1.2em]" />
                        {post.category}
                    </li>
                    <li className="flex items-center gap-2 capitalize">
                        <span className="text-main-400 text-base">
                            {ForumTypeIcons[post.postType]}
                        </span>
                        {post.postType}
                    </li>
                    <li className="flex items-center gap-2">
                        <BsHeartFill className="text-pink-500/80 text-[1.2em]" />
                        {post.liked.length} Likes
                    </li>

                    <li className="md:hidden xl:flex items-center gap-2">
                        <BiCommentDots className="text-slate-600 text-[1.2em]" />
                        {post.comments.length} Comments
                    </li>
                </ul>
            </header>
            <TextEditor value={post.content || ''} readOnly={true} />
            <footer className="flex flex-col">
                {/* Post like icon & functionality */}
                <div className="flex justify-center items-center">
                    <PostLike post={post} />
                </div>

                <ul className="flex-start flex-wrap gap-2 text-[0.85rem] mt-4">
                    <BsFillTagsFill className="text-lg text-slate-500" />

                    {post.tags.slice(0, 5).map((tag, idx) => (
                        <li
                            key={idx}
                            className="px-2 py-[0.125rem] bg-gray-400/40 hover:bg-gray-600/90 hover:text-gray-50 rounded-sm"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            </footer>
        </article>
    );
};

export default PostCard;
