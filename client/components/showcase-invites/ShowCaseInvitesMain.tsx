'use client';
import React, { useMemo, useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { IExerciseWithId } from '../../models/interfaces';
import { compareByName } from '../../utils/sorting-utils';
import ShowCaseInviteHeader from './sections/ShowCaseInviteHeader';
import ShowCaseInviteList from './sections/ShowCaseInviteList';
import ShowcaseListOptions from './sections/ShowCaseListOptions';
import ShowCaseInviteMessage from './sections/ShowcaseInviteMessage';
import useAuth from '@/hooks/utils/useAuth';
import { useUserContext } from '@/store/context/UserContext';
import useExerciseListQuery from '@/hooks/exercise/useExerciseListQuery';

interface Props {
  exercises: IExerciseWithId[];
}

const ShowCaseInvitesMain: React.FC<Props> = ({ exercises: initialExercisesData }) => {
  useAuth();
  const { isLoading, user, submissionMap } = useUserContext();
  const { exercises, error } = useExerciseListQuery(initialExercisesData);
  if (error) console.log(error);
  const [showCreatedExercises, setShowCreatedExercises] = useState(true);

  const createdExercises = useMemo(
    () => exercises.filter((ex) => ex.author._id === user?._id) || [],
    [exercises, user?._id],
  );
  const solvedExercises = exercises.filter((ex) => submissionMap[ex._id]?.correct);

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
      {isLoading && (
        <div className="flex justify-center items-center my-10">
          <BounceLoader size={90} color="#5552e4" />
        </div>
      )}
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

export default ShowCaseInvitesMain;
