import React, { useState } from 'react';
import { BsFillReplyFill } from 'react-icons/bs';
import {
    MdOutlineThumbDown,
    MdOutlineThumbUpOffAlt,
    MdThumbDownAlt,
    MdThumbUpAlt,
} from 'react-icons/md';

import { deleteComment, postCommentVote } from '../../../apis/comment';
import { IComment, IVote } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import { getDateTimeFormat } from '../../../utils/datetime';
import { toastNotify } from '../../../utils/notification';
import DeleteButton from '../buttons/icon-buttons/DeleteButton';
import EditButton from '../buttons/icon-buttons/EditButton';
import CommentEditModal from '../comments/CommentEditModal';
import DeleteModal from '../modals/variations/DeleteModal';
import ProfilePicture from '../user/ProfilePicture';

interface Props {
    comment: IComment;
    onReply?: () => void;
}

const CommentCard: React.FC<Props> = ({ comment, onReply }) => {
    const { userDetail } = useUserContext();
    const [votes, setVotes] = useState<IVote[]>(comment.votes);
    const [modal, setModal] = useState<null | 'edit' | 'delete'>(null);

    const handleUserVote = async (type: 'up' | 'down') => {
        if (!userDetail) return;
        const userVoteIndex = votes.findIndex((vote) => vote.user === userDetail._id);

        if (userVoteIndex < 0) {
            // If the user has no votes so far, add a new vote.
            const newVote = { type, user: userDetail._id };
            setVotes([...votes, newVote]);
            await postCommentVote(comment._id, { type });
        } else {
            const userVote = votes[userVoteIndex];

            if (userVote.type === type) {
                // Cancel voting.
                setVotes(votes.filter((vote) => vote.user !== userDetail._id));
            } else {
                // If the user already has vote on this comment, modify the vote and create a new array.
                votes[userVoteIndex].type = type;
                setVotes([...votes]);
                await postCommentVote(comment._id, { type });
            }
        }
    };

    const handleDeleteComment = async () => {
        const { ok } = await deleteComment(comment._id);

        if (ok) toastNotify('Deleted your comment!');
        else toastNotify('Oops, something went wrong while deleting your comment.', 'error');
    };

    // Derive upvote & downvote count from the list of votes
    const upvoteCount = votes.reduce(
        (accCount, curr) => (curr.type === 'up' ? accCount + 1 : accCount),
        0,
    );
    const downVoteCount = votes.length - upvoteCount;

    // Find current user's vote on this comment.
    const userVote = votes.find((vote) => vote.user === userDetail?._id);

    const isCommentAuthor = comment.user._id === userDetail?._id;

    return (
        <article className="flex-1 flex gap-4 text-gray-799">
            <ProfilePicture picture={comment.user.pictureUrl} />
            <div className="flex-1">
                <header className="flex gap-3 items-center">
                    <h3>{comment.user.name}</h3>
                    <time className="text-sm text-gray-500 font-semibold">
                        {getDateTimeFormat(comment.postedAt)}
                    </time>
                </header>
                {/* Comment body text */}
                <p className="text-gray-600 mt-1">{comment.text}</p>

                {/* Comment votes & replies */}
                <footer className="w-full flex gap-1 lg:gap-3 mt-2">
                    <div
                        onClick={() => handleUserVote('up')}
                        className={`flex-start gap-1 cursor-pointer hover:text-main-500 ${
                            userVote?.type === 'up' ? 'text-main-500' : ''
                        }`}
                    >
                        {userVote?.type === 'up' ? (
                            <MdThumbUpAlt className="text-xl cursor-pointer" />
                        ) : (
                            <MdOutlineThumbUpOffAlt className="text-lg cursor-pointer" />
                        )}
                        <span className="text-sm">{upvoteCount}</span>
                    </div>

                    <div
                        onClick={() => handleUserVote('down')}
                        className={`flex-start gap-1 cursor-pointer hover:text-main-500 ${
                            userVote?.type === 'down' ? 'text-main-500' : ''
                        }`}
                    >
                        {userVote?.type === 'down' ? (
                            <MdThumbDownAlt className="text-xl cursor-pointer" />
                        ) : (
                            <MdOutlineThumbDown className="text-lg cursor-pointer" />
                        )}
                        <span className="text-sm">{downVoteCount}</span>
                    </div>

                    {onReply && (
                        <div
                            onClick={onReply}
                            className="flex-start gap-1 cursor-pointer hover:text-main-500"
                        >
                            <BsFillReplyFill className="text-xl cursor-pointer" />
                            <span className="text-sm">Reply</span>
                        </div>
                    )}

                    {isCommentAuthor && (
                        <div className="ml-auto">
                            <EditButton onEdit={() => setModal('edit')} />
                            <DeleteButton onDelete={() => setModal('delete')} />
                        </div>
                    )}
                </footer>
            </div>

            {modal === 'edit' && (
                <CommentEditModal onClose={() => setModal(null)} comment={comment} />
            )}

            {modal === 'delete' && (
                <DeleteModal
                    onClose={() => setModal(null)}
                    deleteFunction={handleDeleteComment}
                    item="your comment"
                />
            )}
        </article>
    );
};

export default CommentCard;
