import React, { useState } from 'react';
import { IExercise, IShowCase, IVote } from '../../../models/interfaces';
import CodeEditor from '../editor/CodeEditor';
import { getDateTimeFormat } from '../../../utils/datetime';
import {
    BsFillPersonFill,
    BsClock,
    BsFillChatLeftFill,
    BsFileCode,
    BsShare,
} from 'react-icons/bs';
import {
    postVoteRequest,
    deleteShowcaseVote,
    postShowcaseComment,
} from '../../../apis/exercise.api';
import { useUserContext } from '../../../store/context/UserContext';
import CommentCard from './CommentCard';
import useShowcaseCommentQuery from '../../../hooks/exercise-queries/useShowcaseCommentQuery';
import CommentForm from '../comments/CommentForm';
import { toastNotify } from '../../../utils/notification';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import SocialPanel from '../social/SocialPanel';
import { AppProperty } from '../../../constants/app';

interface Props {
    showcase: IShowCase;
    exercise: IExercise;
    className?: string;
}

const ShowcaseCard: React.FC<Props> = ({ showcase, className, exercise }) => {
    const { userDetail } = useUserContext();
    const { userSubmission } = useShowcase();

    const userId = userDetail?._id;
    const [votes, setVotes] = useState<IVote[]>(showcase.votes);
    const [showComment, setShowComment] = useState<Boolean>(false);
    const [compare, setCompare] = useState<Boolean>(false);

    const { showcaseComments } = useShowcaseCommentQuery(showcase._id);

    const handleUserVote = async (type: 'up' | 'down') => {
        if (!userId) return;
        const userVoteIndex = votes.findIndex((vote) => vote.user === userId);

        if (userVoteIndex < 0) {
            // If the user has no votes so far, add a new vote.
            const newVote = { type, user: userId };
            setVotes([...votes, newVote]);

            // Send request to post the comment vote by this user.
            await postVoteRequest(showcase._id, { type });
        } else {
            const userVote = votes[userVoteIndex];

            if (userVote.type === type) {
                // Cancel voting.
                setVotes(votes.filter((vote) => vote.user !== userId));

                // Send DELETE request to cancel the vote on this comment.
                await deleteShowcaseVote(showcase._id);
            } else {
                // If the user already has vote on this comment, modify the vote and create a new array.
                votes[userVoteIndex].type = type;
                setVotes([...votes]);
                await postVoteRequest(showcase._id, { type });
            }
        }
    };

    const userVote = votes.find((vote) => vote.user === userId);

    const upvoteCount = votes.reduce(
        (accCount, curr) => (curr.type === 'up' ? accCount + 1 : accCount),
        0,
    );
    const downVoteCount = votes.length - upvoteCount;
    const totalVotes = upvoteCount - downVoteCount;

    const handleSubmitComment = async (text: string) => {
        // Send Http POST request to send the user comment to the server.
        const newComment = { text }; // Comment only requires 'text' prop when sending it to the server.
        if (!showcase) return;

        // Send Http POST request to add the user's comment to the server.
        const { ok, message } = await postShowcaseComment(showcase._id, newComment);

        if (ok) toastNotify('Post comment!', 'success');
        else toastNotify(`Oops, ${message}`, 'error');
    };

    return (
        <article
            className={`flex flex-col gap-3 px-3 sm:px-6 py-3 bg-gray-50 border-2 border-gray-200/90 rounded-sm transition-all shadow-md${className}`}
        >
            <h2 className="text-gray-500 font-bold text-lg sm:text-xl">
                {showcase.description}
            </h2>
            <div className="flex flex-row m-0">
                <div className="flex content-center mr-5">
                    <BsFillPersonFill className="m-1" />
                    <h5>{showcase.user.name}</h5>
                </div>
                <div className="flex content-center">
                    <BsClock className="m-1" />
                    <h5>{getDateTimeFormat(showcase.postedAt, false)}</h5>
                </div>
            </div>
            <div className="grid grid-cols-8 gap-3 items-center">
                <div className="col-span-7">
                    {compare ? (
                        <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                            <div className="col-span-1 border-2 border-gray-200 rounded">
                                <h5 className="bg-gray-200 px-2 py-1 font-semibold">
                                    Their Solution
                                </h5>
                                <CodeEditor
                                    className="flex-1 border-transparent focus-within:border-main-300 shadow-none"
                                    onChange={() => {}}
                                    showHeader={false}
                                    language={exercise.language}
                                    value={showcase.code}
                                    readOnly={true}
                                />
                            </div>
                            <div className="col-span-1 border-2 border-gray-200">
                                <h5 className="bg-gray-200 px-2 py-1 font-semibold">
                                    Your Solution
                                </h5>
                                <CodeEditor
                                    className="flex-1 border-transparent focus-within:border-main-300 shadow-none"
                                    onChange={() => {}}
                                    showHeader={false}
                                    language={exercise.language}
                                    value={userSubmission?.code}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <CodeEditor
                            className="flex-1 border-gray-200 focus-within:border-main-300 shadow-none"
                            onChange={() => {}}
                            showHeader={false}
                            language={exercise.language}
                            value={showcase.code}
                            readOnly={true}
                        />
                    )}
                </div>
                <div className="col-span-1 flex flex-col justify-center m-auto text-center text-gray-400">
                    <div>
                        <div className="flex-center px-1 py-1 rounded-full hover:bg-slate-200/90">
                            <IoIosArrowUp
                                className={`text-3xl sm:text-[3rem] hover:text-main-500 cursor-pointer ${
                                    userVote?.type === 'up' ? 'text-main-500' : ''
                                }`}
                                onClick={() => handleUserVote('up')}
                            />
                        </div>
                        <h2 className="font-semibold text-xl sm:text-2xl text-gray-600">
                            {totalVotes}
                        </h2>
                        <div className="flex-center py-1 rounded-full hover:bg-slate-200/90">
                            <IoIosArrowDown
                                className={`text-3xl sm:text-[2.75rem] hover:text-main-500 cursor-pointer ${
                                    userVote?.type === 'down' ? 'text-main-500' : ''
                                }`}
                                onClick={() => handleUserVote('down')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <div className="self-stretch flex content-center">
                    <button
                        className={`${btnClass} ${
                            showComment ? 'text-main-500 font-semibold' : ''
                        } hover:bg-main-400`}
                        onClick={() => setShowComment(!showComment)}
                    >
                        <BsFillChatLeftFill className="m-1" />
                        <h5>
                            {showcaseComments.length} Comment
                            {showcaseComments.length > 1 && 's'}
                        </h5>
                    </button>
                </div>
                <div className="flex content-center">
                    <div
                        className={`${btnClass} ${
                            compare ? 'text-violet-700 font-semibold' : ''
                        } hover:bg-violet-600`}
                        onClick={() => setCompare(!compare)}
                    >
                        <BsFileCode className="m-1" />
                        <h5>Compare With Yours</h5>
                    </div>
                </div>
                <SocialShareButton />
            </div>
            {showComment ? (
                <div className="mt-3 flex flex-col gap-2">
                    <CommentForm onSubmit={handleSubmitComment} className="mb-5" />
                    {showcaseComments.map((comment) => (
                        <CommentCard comment={comment} />
                    ))}
                </div>
            ) : null}
        </article>
    );
};

// Cummon btn class for showing comments and showing comparison
const btnClass =
    'flex w-full sm:w-fit px-3 py-[0.3rem] rounded-full hover:text-white transition-all cursor-pointer';

// Button to share the showcase in SNS
const SocialShareButton: React.FC = () => {
    const [showPanel, setShowPanel] = useState<boolean>(false);
    const { exercise, userSubmission } = useShowcase();

    return (
        <div className="flex-center relative">
            <div
                className={`${btnClass} ${
                    showPanel ? 'text-pink-700 font-semibold' : ''
                } hover:bg-pink-600`}
                onClick={() => setShowPanel((ps) => !ps)}
            >
                <BsShare className="m-1 mr-2" />
                <h5>Share</h5>
            </div>
            {showPanel && (
                <SocialPanel
                    onClose={() => setShowPanel(false)}
                    className="bottom-[130%] left-[50%] -translate-x-[50%]"
                    title={`${exercise?.name} solution showcase`}
                    tags={[...(exercise?.tags || []), 'Showcase']}
                    source={userSubmission?.code}
                    via={AppProperty.APP_NAME}
                />
            )}
        </div>
    );
};

export default ShowcaseCard;
