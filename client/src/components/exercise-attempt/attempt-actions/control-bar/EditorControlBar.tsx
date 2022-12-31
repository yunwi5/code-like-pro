import React, { useEffect, useState } from 'react';

import { likeExerciseRequest } from '../../../../apis/exercise.api';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { useUserContext } from '../../../../store/context/UserContext';
import { getLanguageIcon, prettierLanguageName } from '../../../../utils/language';
import DifficultyRatingButton from './DifficultyRatingButton';
import ExerciseSettings from './ExerciseSettings';
import ExerciseFavorite from './ExerciseFavorite';
import ExerciseReportButton from './ExerciseReportButton';

// Control header that let users set language settings, favorite and report functionalities.
const EditorControlBar: React.FC = () => {
    const { userDetail } = useUserContext();
    const userId = userDetail?._id;
    const { exercise, refetchExercise } = useExerciseAttemptCtx();

    // State for whether the user liked the exercise or not.
    const [liked, setLiked] = useState(false);

    const handleLiked = async () => {
        // Needs to send the request to the server that the user liked it or not.
        setLiked((ps) => !ps);
        if (exercise == null) return;
        await likeExerciseRequest(exercise._id);
        refetchExercise();
    };

    // Set the user liked status initially based on the previous liked exercises of the user.
    useEffect(() => {
        if (!exercise?._id || !userId) return;
        setLiked(exercise?.liked.includes(userId));
    }, [exercise?._id, userId]);

    // Check if the user is an author of this exercise. If author, show the settings option.
    const isAuthor = exercise?.author._id === userId;

    if (!exercise) return null;

    return (
        <div className="flex items-center px-3 lg:pl-1 lg:pr-4 py-[0.55rem] lg:py-[0.375rem] ">
            {/* Language settings */}
            <div
                className={`px-3 py-[0.3rem] flex-center bg-slate-50 hover:bg-slate-100 text-gray-600 gap-2 rounded shadow transition-all`}
            >
                {getLanguageIcon(exercise.language, {
                    width: '25px',
                    height: '25px',
                })}
                {prettierLanguageName(exercise.language || '')}
            </div>

            {/* Favorite toggler */}
            <ExerciseFavorite
                key={`exercise-favorite-${exercise.liked.join('.')}`}
                liked={liked}
                onToggleLike={handleLiked}
            />

            <ExerciseReportButton />

            <DifficultyRatingButton />
            {isAuthor && <ExerciseSettings />}
        </div>
    );
};

export default EditorControlBar;
