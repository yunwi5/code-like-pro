import React from 'react';
import {
    MdOutlineThumbDown,
    MdOutlineThumbUpOffAlt,
    MdThumbDownAlt,
    MdThumbUpAlt,
} from 'react-icons/md';
import { IVote } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';

interface Props {
    votes: IVote[];
    onVote: (type: 'up' | 'down') => void;
}

// Set of upvote and downvote buttons and functionalities.
const VoteButtons: React.FC<Props> = ({ votes, onVote }) => {
    const userId = useUserContext().userDetail?._id;

    // Derive upvote & downvote count from the list of votes
    const upvoteCount = votes.reduce(
        (accCount, curr) => (curr.type === 'up' ? accCount + 1 : accCount),
        0,
    );
    const downVoteCount = votes.length - upvoteCount;

    // Find current user's vote on this comment.
    const userVote = votes.find((vote) => vote.user === userId);

    return (
        <>
            <div
                onClick={() => onVote('up')}
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
                onClick={() => onVote('down')}
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
        </>
    );
};

export default VoteButtons;
