import React, { useMemo, useState } from 'react';
import { IExerciseWithId } from '../../models/interfaces';
import { compareByName } from '../../utils/sorting-utils';
import ShowCaseInviteHeader from './sections/ShowCaseInviteHeader';
import ShowCaseInviteList from './sections/ShowCaseInviteList';
import ShowcaseListOptions from './sections/ShowCaseListOptions';
import ShowCaseInviteMessage from './sections/ShowcaseInviteMessage';

interface Props {
    isLoading: boolean;
    createdExercises: IExerciseWithId[];
    solvedExercises: IExerciseWithId[];
}

// Page for listing available showcases for users to join.
const ShowCaseInvites: React.FC<Props> = ({
    isLoading,
    createdExercises,
    solvedExercises,
}) => {
    // Display either creatd exercises or solved ones depending on the selection.
    const [showCreatedExercises, setShowCreatedExercises] = useState(true);

    // Selected showcase invited exercises either 'Created' or 'Solved' exercises by the user.
    // Sort the list alphabtically.
    const selectedExercises = useMemo(() => {
        const selected = showCreatedExercises ? createdExercises : solvedExercises;
        return selected.sort((a, b) => compareByName(a, b));
    }, [showCreatedExercises, createdExercises, solvedExercises]);

    const displayInviteMessage = !isLoading && selectedExercises.length === 0;

    return (
        <main className="flex flex-col gap-5 px-3 sm:px-5 py-12 min-w-[90vw] xl:min-w-[70vw] max-w-[60rem] min-h-[50vh] text-gray-700">
            <ShowCaseInviteHeader />
            <ShowcaseListOptions
                showCreatedExercises={showCreatedExercises}
                setShowCreatedExercises={setShowCreatedExercises}
                selectedExercises={selectedExercises}
            />
            {displayInviteMessage && (
                <ShowCaseInviteMessage
                    exercises={selectedExercises}
                    inviteMode={showCreatedExercises ? 'created' : 'solved'}
                />
            )}
            <ShowCaseInviteList
                exercises={selectedExercises}
                inviteMode={showCreatedExercises ? 'created' : 'solved'}
            />
        </main>
    );
};

export default ShowCaseInvites;
