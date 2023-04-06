import { useQueryClient } from '@tanstack/react-query';
import useListQueryCacheUpdate from '../../cache/useListQueryCacheUpdate';
import { ShowcaseProps, postExerciseShowCase } from '../../../apis/exercise.api';
import { toastNotify } from '../../../utils/notification';
import { getExerciseShowcasesKey } from '../keys';

function useExerciseShowcasesMutation(exerciseId: string) {
    const queryClient = useQueryClient();

    const showcaseQueryKey = getExerciseShowcasesKey(exerciseId);
    const { addItemToCache, updateItemInCache } =
        useListQueryCacheUpdate(showcaseQueryKey);

    const postShowcase = async (showcaseProps: ShowcaseProps): Promise<boolean> => {
        const {
            ok,
            message,
            data: newShowcase,
            status,
        } = await postExerciseShowCase(exerciseId, showcaseProps);

        if (ok) {
            toastNotify('Your showcase was posted!', 'success');

            if (status === 201) {
                addItemToCache(newShowcase);
            } else if (status === 200) {
                updateItemInCache(newShowcase);
            }
        } else {
            toastNotify(`Sorry there is an error: ${message}.`, 'error');
        }
        refetch();

        return ok;
    };

    const refetch = () => queryClient.refetchQueries([showcaseQueryKey]);

    return { postShowcase };
}

export default useExerciseShowcasesMutation;
