import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GoAlert } from 'react-icons/go';

import { likeExerciseRequest } from '../../../apis/exercise.api';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import { useUserContext } from '../../../store/context/UserContext';
import { prettierLanguageName } from '../../../utils/language';
import HoveringLabel from '../../ui/labels/HoveringLabel';
import IssueReportModal from '../modals/IssueReportModal';
import ExerciseSettings from './ExerciseSettings';

// Control header that let users set language settings, favorite and report functionalities.
const EditorControlBar: React.FC = () => {
    const { likedExerciseIdSet, userDetail } = useUserContext();
    const { exercise, refetchExercise } = useExerciseAttemptCtx();
    const [showReportModal, setShowReportModal] = useState(false);

    // State for whether the user liked the exercise or not.
    const [liked, setLiked] = useState(false);

    const handleLiked = async () => {
        // Needs to send the request to the server that the user liked it or not.
        setLiked((ps) => !ps);
        if (exercise == null) return;
        await likeExerciseRequest(exercise?._id);
        refetchExercise();
    };

    // Set the user liked status initially based on the previous liked exercises of the user.
    useEffect(() => {
        setLiked(likedExerciseIdSet.has(exercise?._id || ''));
    }, [likedExerciseIdSet, exercise?._id]);

    // Check if the user is an author of this exercise. If author, show the settings option.
    const isAuthor = !!userDetail?.exercises.find((ex) => ex._id === exercise?._id);

    return (
        <>
            <div className="flex items-center px-3 lg:pl-1 lg:pr-4 py-[0.55rem] lg:py-[0.375rem] ">
                {/* Language settings */}
                <div>
                    <label className="mr-2" htmlFor="language-select">
                        Language
                    </label>
                    <select
                        id="language-select"
                        defaultValue={exercise?.language}
                        className="text-gray-600 border-2 border-gray-500/90 bg-gray-50 focus:outline focus:outline-2 focus:outline-main-500 focus:text-main-500 focus:border-transparent shadow-md rounded-sm px-2 py-1"
                    >
                        <option value={exercise?.language}>
                            {prettierLanguageName(exercise?.language || '')}
                        </option>
                    </select>
                </div>

                {/* Favorite toggler */}
                <HoveringLabel
                    className="ml-auto z-50"
                    label={
                        <span className="text-base hover:text-yellow-300">Favorite</span>
                    }
                >
                    <div
                        onClick={handleLiked}
                        className="icon-box ml-auto w-[2rem] h-[2rem] border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-yellow-50"
                    >
                        {liked ? <AiFillStar /> : <AiOutlineStar />}
                    </div>
                </HoveringLabel>

                {/* Report button */}
                <HoveringLabel
                    className="ml-2 z-50"
                    onClick={() => setShowReportModal(true)}
                    label={
                        <span className="text-base hover:text-yellow-300">Report</span>
                    }
                >
                    <div className="icon-box w-[2rem] h-[2rem] border-main-500 text-main-400 hover:bg-main-400 hover:text-main-50">
                        <GoAlert />
                    </div>
                </HoveringLabel>

                {isAuthor && <ExerciseSettings />}
            </div>
            {showReportModal && (
                <IssueReportModal onClose={() => setShowReportModal(false)} />
            )}
        </>
    );
};

export default EditorControlBar;
