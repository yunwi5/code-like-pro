import React, { useMemo, useState } from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { IExerciseWithId } from '../../models/interfaces';
import { getBrowsingPageLink, getExerciseCreationPageLink } from '../../utils/links';
import { compareByName } from '../../utils/sorting-utils';
import ShowCaseInviteHeader from './sections/ShowCaseInviteHeader';
import ShowCaseInviteList from './sections/ShowCaseInviteList';
import ShowcaseListOptions from './sections/ShowCaseListOptions';

interface Props {
    createdExercises: IExerciseWithId[];
    solvedExercises: IExerciseWithId[];
}

// Page for listing available showcases for users to join.
const ShowCaseInvites: React.FC<Props> = ({ createdExercises, solvedExercises }) => {
    // Display either creatd exercises or solved ones depending on the selection.
    const [showCreatedExercises, setShowCreatedExercises] = useState(false);

    // Selected showcase invited exercises either 'Created' or 'Solved' exercises by the user.
    // Sort the list alphabtically.
    const selectedExercises = useMemo(() => {
        const selected = showCreatedExercises ? createdExercises : solvedExercises;
        return selected.sort((a, b) => compareByName(a, b));
    }, [showCreatedExercises, createdExercises, solvedExercises]);

    return (
        <main className="flex flex-col gap-5 px-3 sm:px-5 py-12 min-w-[90vw] xl:min-w-[70vw] max-w-[60rem] min-h-[50vh] text-gray-700">
            <ShowCaseInviteHeader />
            <ShowcaseListOptions
                showCreatedExercises={showCreatedExercises}
                setShowCreatedExercises={setShowCreatedExercises}
                selectedExercises={selectedExercises}
            />
            <ShowCaseInviteMessages
                exercises={selectedExercises}
                inviteMode={showCreatedExercises ? 'created' : 'solved'}
            />
            <ShowCaseInviteList
                exercises={selectedExercises}
                inviteMode={showCreatedExercises ? 'created' : 'solved'}
            />
        </main>
    );
};

interface MessageProps {
    exercises: IExerciseWithId[];
    inviteMode: 'created' | 'solved';
}
// If the user did not create exercises, or did not solve any exercises,
// there are no showcase options to be displayed.
// Hence, display messages and links for users to start creating or solving exercises.
const ShowCaseInviteMessages: React.FC<MessageProps> = ({ exercises, inviteMode }) => {
    if (exercises.length > 0) return null;

    return (
        <div className="mt-7 py-5 flex-center flex-col gap-3">
            <h2 className="flex-center gap-2 text-xl">
                <RiEmotionSadLine className="text-main-500 text-3xl" />
                You have no {inviteMode === 'created' ? 'created' : 'solved'} works to be
                showcased.
            </h2>
            <Link
                to={
                    inviteMode === 'created'
                        ? getExerciseCreationPageLink()
                        : getBrowsingPageLink()
                }
                className="btn btn-empty"
            >
                {inviteMode === 'created' ? 'Create' : 'Solve'} One!
            </Link>
        </div>
    );
};

export default ShowCaseInvites;
