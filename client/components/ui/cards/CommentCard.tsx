import { FC, useState } from 'react';
import { AiTwotoneCrown } from 'react-icons/ai';
import { BsFillReplyFill } from 'react-icons/bs';

import { deleteCommentVote, postCommentVote } from '../../../apis/comment.api';
import { IComment, IVote } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import { getDateTimeFormat } from '../../../utils/datetime.util';
import DeleteButton from '../buttons/icon-buttons/DeleteButton';
import EditButton from '../buttons/icon-buttons/EditButton';
import VoteButtons from '../buttons/VoteButtons';
import CommentEditModal from '../comments/CommentEditModal';
import Banner from '../labels/Banner';
import DeleteModal from '../modals/variations/DeleteModal';
import ProfilePicture from '../user/ProfilePicture';

interface Props {
  comment: IComment & { best?: boolean };
  onUpdate: (id: string, updateProp: { text: string }) => void;
  onDelete: (id: string) => Promise<void> | void;
  onReply?: () => void;
}

const CommentCard: FC<Props> = ({ comment, onReply, onUpdate, onDelete }) => {
  const { userDetail } = useUserContext();
  const userId = userDetail?._id;
  const [votes, setVotes] = useState<IVote[]>(comment.votes);

  // Set modal either none, edit modal or delete modal.
  const [modal, setModal] = useState<null | 'edit' | 'delete'>(null);

  const handleUserVote = async (type: 'up' | 'down') => {
    if (!userId) return;
    const userVoteIndex = votes.findIndex((vote) => vote.user === userId);

    if (userVoteIndex < 0) {
      // If the user has no votes so far, add a new vote.
      const newVote = { type, user: userId };
      setVotes([...votes, newVote]);

      // Send request to post the comment vote by this user.
      await postCommentVote(comment._id, { type });
    } else {
      const userVote = votes[userVoteIndex];

      if (userVote.type === type) {
        // Cancel voting.
        setVotes(votes.filter((vote) => vote.user !== userId));

        // Send DELETE request to cancel the vote on this comment.
        await deleteCommentVote(comment._id);
      } else {
        // If the user already has vote on this comment, modify the vote and create a new array.
        votes[userVoteIndex].type = type;
        setVotes([...votes]);
        await postCommentVote(comment._id, { type });
      }
    }
  };

  const handleDeleteComment = async () => {
    await onDelete(comment._id);
  };

  // Check if the user is the author of the comment.
  const isCommentAuthor = comment.user._id === userId;

  return (
    <article className="flex-1 flex gap-4 text-gray-799">
      <ProfilePicture picture={comment.user.picture} alt={comment.user.name} />
      <div className="flex-1">
        <header className="flex gap-3 items-center">
          <h3>{comment.user.name}</h3>
          {comment.best && (
            <Banner icon={AiTwotoneCrown} text="Best" className="bg-yellow-500 text-[0.7rem]" />
          )}
          <time className="ml-auto text-xs text-gray-500/90 font-semibold">
            {getDateTimeFormat(comment.postedAt)}
          </time>
        </header>
        <p className="text-gray-600 mt-1 whitespace-pre">{comment.text}</p>

        <footer className="w-full flex gap-1 lg:gap-3 mt-2">
          <VoteButtons votes={votes} onVote={handleUserVote} />

          {onReply && (
            <div onClick={onReply} className="flex-start gap-1 cursor-pointer hover:text-main-500">
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

      <CommentEditModal
        open={modal === 'edit'}
        onUpdate={onUpdate}
        onClose={() => setModal(null)}
        comment={comment}
      />

      <DeleteModal
        open={modal === 'delete'}
        onClose={() => setModal(null)}
        deleteFunction={handleDeleteComment}
        item="your comment"
      />
    </article>
  );
};

export default CommentCard;
