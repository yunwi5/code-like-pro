import React, { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { postForumPostLike } from '../../../../apis/forum';
import { IForumPostPopulated } from '../../../../models/interfaces';
import { useUserContext } from '../../../../store/context/UserContext';
import HoveringLabel from '../../../ui/labels/HoveringLabel';

// Post 'like' by user, UI and functionality
const PostLike: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
    const userId = useUserContext().userDetail?._id;
    // State for whether the user liked the post or not.
    const [liked, setLiked] = useState(post.liked.includes(userId || ''));

    const handlePostLikeByUser = async () => {
        setLiked((ps) => !ps);
        await postForumPostLike(post._id);
    };

    // Update the local state, if the post object changes.
    useEffect(() => {
        setLiked(post.liked.includes(userId || ''));
    }, [post]);

    return (
        <HoveringLabel label={liked ? 'Unlike!' : 'Like!'} onClick={handlePostLikeByUser}>
            <div className="px-2 py-2 text-2xl border-2 border-pink-500 text-pink-600 hover:bg-pink-600 hover:text-white transition-all rounded cursor-pointer">
                {liked ? <BsHeartFill /> : <BsHeart />}
            </div>
        </HoveringLabel>
    );
};

export default PostLike;
