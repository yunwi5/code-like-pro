import React from 'react';
import { postExerciseComment } from '../../../apis/exercise';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import { toastNotify } from '../../../utils/notification';
import CommentForm from '../../ui/comments/CommentForm';
import CommentList from '../../ui/lists/CommentList';

const ShowcaseDiscussions: React.FC = () => {
    const { exercise, comments, refetchQuery } = useShowcase();

    console.table(comments);

    // Handle comment submission from the user.
    const handleSubmitComment = async (text: string) => {
        // Send Http POST request to send the user comment to the server.
        const newComment = { text }; // Comment only requires 'text' prop when sending it to the server.

        if (!exercise) return;
        const { ok, data, message } = await postExerciseComment(exercise._id, newComment);

        if (ok) toastNotify('Post comment!', 'success');
        else toastNotify(`Oops, ${message}`, 'error');

        // Refetch the comments data from the server as the comments should be updated with the new comment.
        refetchQuery('comments');
    };

    return (
        <div className="flex flex-col gap-12 py-1 px-8">
            <div className="flex justify-end -mb-8">
                <h5 className="text-gray-500 font-bold text-lg">{comments.length} Comments</h5>
            </div>
            <CommentForm onSubmit={handleSubmitComment} />
            <CommentList comments={comments} />
        </div>
    );
};

export default ShowcaseDiscussions;
