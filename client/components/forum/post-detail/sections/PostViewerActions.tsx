import React, { useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

import usePostLoginRedirect from '@/hooks/user/usePostLoginRedirect';

import useForumPostMutation from '../../../../hooks/forum/forum-post/useForumPostMutation';
import { IForumPostPopulated, IVote } from '../../../../models/interfaces';
import { useUserContext } from '../../../../store/context/UserContext';

import PostShare from './PostShare';

const PostViewerActions: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
  const { redirectToLoginRoute } = usePostLoginRedirect();
  const { userDetail } = useUserContext();
  const userId = userDetail?._id;

  const { postVote, deleteVote } = useForumPostMutation(post);
  const [votes, setVotes] = useState<IVote[]>(post?.votes || []);

  const handleUserVote = async (type: 'up' | 'down') => {
    if (!userId) {
      redirectToLoginRoute();
      return;
    }
    const userVoteIndex = votes.findIndex((vote) => vote.user === userId);

    if (userVoteIndex < 0) {
      // If the user has no votes so far, add a new vote.
      const newVote = { type, user: userId };
      setVotes([...votes, newVote]);
      await postVote(type);
    } else {
      const userVote = votes[userVoteIndex];

      if (userVote.type === type) {
        // Cancel voting.
        setVotes(votes.filter((vote) => vote.user !== userId));
        await deleteVote();
      } else {
        // If the user already has vote on this comment, modify the vote and create a new array.
        votes[userVoteIndex].type = type;
        setVotes([...votes]);
        await postVote(type);
      }
    }
  };

  const userVote = votes.find((vote) => vote.user === userId);

  const upvoteCount = votes.reduce(
    (accCount, curr) => (curr.type === 'up' ? accCount + 1 : accCount),
    0,
  );
  const downVoteCount = votes.length - upvoteCount;

  return (
    <div className="flex justify-center items-center gap-3 text-slate-600">
      <VoteIcon
        type="up"
        voted={userVote?.type === 'up'}
        voteCount={upvoteCount}
        onClick={() => handleUserVote('up')}
      />
      <VoteIcon
        type="down"
        voted={userVote?.type === 'down'}
        voteCount={downVoteCount}
        onClick={() => handleUserVote('down')}
      />
      <PostShare post={post} className="self-start ml-1" />
    </div>
  );
};

interface VoteIconProps {
  type: 'up' | 'down';
  voted?: boolean;
  voteCount: number;
  onClick(): void;
}

function getVoteIcon(type: 'up' | 'down', voted: boolean) {
  if (!voted) {
    return type === 'up' ? <AiOutlineLike /> : <AiOutlineDislike />;
  } else {
    return type === 'up' ? <AiFillLike /> : <AiFillDislike />;
  }
}

const VoteIcon: React.FC<VoteIconProps> = ({ voted, type, voteCount, onClick }) => (
  <div className="flex flex-col gap-1 items-center">
    <div
      onClick={onClick}
      className="flex-center p-[0.35rem] border-2 border-slate-300 hover:border-slate-500 hover:bg-slate-500 hover:text-white text-2xl rounded cursor-pointer"
    >
      {getVoteIcon(type, voted || false)}
    </div>
    <p className="text-sm font-bold">{voteCount}</p>
  </div>
);

export default PostViewerActions;
