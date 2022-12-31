import { useQueryClient } from '@tanstack/react-query';

import { getExerciseSubmissionsKey } from '../keys';
import useListQueryCacheUpdate from '../../cache/useListQueryCacheUpdate';
import * as SubmissionAPI from '../../../apis/submission.api';
import { IUserSubmission } from '../../../models/interfaces';
import { toastNotify } from '../../../utils/notification';

function useExerciseSubmissionsMutation(exerciseId: string) {
    const queryClient = useQueryClient();

    const submissionsQueryKey = getExerciseSubmissionsKey(exerciseId);
    const { addItemToCache, updateItemInCache } =
        useListQueryCacheUpdate(submissionsQueryKey);

    const postSubmission = async (
        userSolution: string,
    ): Promise<[boolean, IUserSubmission | undefined]> => {
        const {
            ok,
            data: newSubmission,
            status,
            message,
        } = await SubmissionAPI.postSubmission(exerciseId, { code: userSolution });

        if (ok && newSubmission) {
            if (status === 201) {
                addItemToCache(newSubmission);
            } else if (status === 200) {
                updateItemInCache(newSubmission);
            }
        } else {
            toastNotify(`Oops, ${message}`, 'error');
        }
        refetch();

        return [ok, newSubmission];
    };

    const refetch = () => queryClient.refetchQueries([submissionsQueryKey]);

    return { postSubmission };
}

export default useExerciseSubmissionsMutation;
