import { useQueryClient } from '@tanstack/react-query';

import { likeExerciseRequest, postExerciseDifficultyVote } from '../../../apis/exercise.api';
import { Difficulty } from '../../../models/enums';
import { toastNotify } from '../../../utils/notification.util';
import { getExerciseKey } from '../keys';
import { IExerciseWithId } from '../../../models/interfaces';

function useExerciseMutation(exerciseId: string) {
  const queryClient = useQueryClient();

  const exerciseQueryKey = getExerciseKey(exerciseId);

  const updateExerciseCache = (updatedExercise: IExerciseWithId) => {
    queryClient.setQueryData([exerciseQueryKey], (oldData: { data: IExerciseWithId } | undefined) =>
      oldData ? { ...oldData, data: updatedExercise } : oldData,
    );
  };

  // Toggle user's favorite on the exercise
  const postExerciseLike = async () => {
    if (!exerciseId) return;
    const { ok, data: updatedExercise } = await likeExerciseRequest(exerciseId);

    if (ok && updatedExercise) {
      updateExerciseCache(updatedExercise);
    }

    refetch();
  };

  const postDifficultyVote = async (difficulty: Difficulty): Promise<boolean> => {
    if (!exerciseId) return false;

    const {
      ok,
      data: updatedExercise,
      message,
    } = await postExerciseDifficultyVote(exerciseId, difficulty);

    if (ok && updatedExercise) {
      toastNotify('Rating submitted!', 'success');
      updateExerciseCache(updatedExercise);
    } else {
      toastNotify(`Error: ${message}`, 'error');
    }

    refetch();

    return ok;
  };

  const refetch = () => queryClient.invalidateQueries([exerciseQueryKey]);

  return { postExerciseLike, postDifficultyVote };
}

export default useExerciseMutation;
