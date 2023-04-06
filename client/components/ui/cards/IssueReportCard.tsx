import React, { useState } from 'react';
import { BiMessageAltError } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';

import { deleteReportVote, postReportVote } from '../../../apis/report.api';
import { IIssueReport, IVote } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import VoteButtons from '../buttons/VoteButtons';
import HoveringLabel from '../tooltip/HoveringLabel';

const IssueReportCard: React.FC<{ report: IIssueReport; className?: string }> = ({
    report,
    className = '',
}) => {
    const { userDetail } = useUserContext();
    const userId = userDetail?._id;
    const [votes, setVotes] = useState<IVote[]>(report.votes);

    const handleUserVote = async (type: 'up' | 'down') => {
        if (!userId) return;
        const userVoteIndex = votes.findIndex((vote) => vote.user === userId);

        if (userVoteIndex < 0) {
            // If the user has no votes so far, add a new vote.
            const newVote = { type, user: userId };
            setVotes([...votes, newVote]);

            // Send request to post the report vote by this user.
            await postReportVote(report._id, { type });
        } else {
            const userVote = votes[userVoteIndex];

            if (userVote.type === type) {
                // Cancel voting.
                setVotes(votes.filter((vote) => vote.user !== userId));

                // Send DELETE request to cancel the vote on this report.
                await deleteReportVote(report._id);
            } else {
                // If the user already has vote on this report, modify the vote and create a new array.
                votes[userVoteIndex].type = type;
                setVotes([...votes]);
                await postReportVote(report._id, { type });
            }
        }
    };

    return (
        <article
            className={`px-3 py-2 flex flex-col gap-2 border-2 border-gray-200 rounded-sm transition-all shadow hover:shadow-md ${className}`}
        >
            <header className="flex-start gap-2">
                <BiMessageAltError className="text-main-500 text-2xl" />
                <h3 className="text-gray-600 text-lg">{report.category}</h3>

                {report.user && (
                    <HoveringLabel
                        label="Reporter"
                        className="flex-start gap-1 xs:ml-auto text-sm"
                    >
                        <FaUser className="text-slate-600" /> {report.user?.name}
                    </HoveringLabel>
                )}
            </header>
            <p>{report.description}</p>
            <footer className="flex gap-3">
                <VoteButtons votes={votes} onVote={handleUserVote} />
            </footer>
        </article>
    );
};

export default IssueReportCard;
