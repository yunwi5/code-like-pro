import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import { getReplyComments, postReplyComment } from '../../../apis/comment.api';
import { IComment } from '../../../models/interfaces';
import CommentCard from '../cards/CommentCard';
import CommentForm from './CommentForm';
import { toastNotify } from '../../../utils/notification';
import useReplyCommentsQuery from '../../../hooks/comment/reply-comments/useReplyCommentsQuery';

interface Props {
    comment: IComment;
    onUpdate?: (id: string, updateProp: { text: string }) => void;
    onDelete?: (id: string) => void;
}

const MainComment: React.FC<Props> = ({ comment, onUpdate, onDelete }) => {
    const [showReplyComments, setShowReplyComments] = useState(false);

    const { replyComments } = useReplyCommentsQuery(comment._id);

    // Handle adding reply comments.
    const handleSubmitReply = async (text: string) => {
        // Send Http POST request to send the new reply comment to the server.
        const newComment = { text };

        const { ok, message } = await postReplyComment(comment._id, newComment);
        if (ok) toastNotify('Posted your reply!', 'success');
        else toastNotify(message || 'Something went wrong...', 'error');
    };

    const toggleShowReplyComments = () => setShowReplyComments((ps) => !ps);

    return (
        <div className="pb-2 border-b-2 border-b-gray-300/80">
            <CommentCard
                comment={comment}
                onReply={toggleShowReplyComments}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
            <button
                onClick={toggleShowReplyComments}
                className="flex items-center my-1 ml-9 px-3 py-2 text-main-500 font-semibold border border-transparent rounded-full hover:bg-main-50 hover:border-main-400 hover:shadow"
            >
                {showReplyComments ? (
                    <IoMdArrowDropup className="text-xl" />
                ) : (
                    <IoMdArrowDropdown className="text-xl" />
                )}
                {replyComments.length} Replies
            </button>

            {/* List of reply comments and reply comment form */}
            {showReplyComments && (
                <div className="flex flex-col gap-5 mt-4 pl-14">
                    {replyComments.map((reply) => (
                        <div key={reply._id} className="flex gap-2">
                            <CommentReplyLine />
                            <CommentCard comment={reply} />
                        </div>
                    ))}
                    <div className="flex gap-2 mb-6">
                        <CommentReplyLine />
                        <CommentForm onSubmit={handleSubmitReply} className="flex-1" />
                    </div>
                </div>
            )}
        </div>
    );
};

const CommentReplyLine = () => (
    <div className="w-[1rem] h-[1rem] border-l-2 border-b-2 border-gray-300" />
);

export default MainComment;
